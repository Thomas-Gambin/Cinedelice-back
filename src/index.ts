import express from "express";
import sequelize from "./database/index";
import ApiRouter from "./routes/apiRoutes";
import backofficeRouter from "./routes/backoffice/backofficeRoutes";
import config from "./utils/dotenv";
import "./database/association";
import bodyParser from "body-parser";
import type { ExpressJoiError } from "express-joi-validation";
import DotenvSchema from "./validators/dotenvValidator";
import cors from "cors";
import { limiter } from "./middlewares/rateLimitValidator";
import { isActive } from "./middlewares/backoffice/isActive";

// Validate the environment configuration
const { error } = DotenvSchema.validate(process.env, {
	abortEarly: false,
	allowUnknown: true,
});
if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection has been established successfully.");
		sequelize.sync({ force: false /*, alter: true*/ });
	})
	.catch((error) => {
		console.error("Unable to connect to the database:", error);
	});

const app = express();

app.use(
	cors({
		origin: "*",
	}),
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));


//Use rateLimit on all route
app.use(limiter);
// Use the route for API
app.use("/api", ApiRouter);
// Use the route for backoffice
app.use(isActive);
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static("public"));
app.use("/backoffice", backofficeRouter);

// Use the joi validation for error
const ContainerTypes = ["body", "query", "headers", "fields", "params"];
app.use(
	(
		err: ExpressJoiError,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		if (err?.type && ContainerTypes.includes(err.type)) {
			res.status(500).json({
				message: err.error.message,
				type: err.type,
			});
		} else {
			next(err);
		}
	},
);

// 404 Not Found
app.use(
	(
		err: Error,
		_req: express.Request,
		res: express.Response,
		_next: express.NextFunction,
	) => {
		res.status(404).json({
			error: err.message,
		});
	},
);

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
