import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import usersRouter from "./usersRoutes";
import ingredientsRouter from "./ingredientsRoutes";
import mediasRouter from "./mediasRoutes";
import categoryRouter from "./categoriesRoutes";
import recipesRouter from "./recipesRoutes";
import authRouter from "./authRoutes";

const backOfficeRouter = express.Router();

backOfficeRouter.use("/dashboard", dashboardRoutes);
backOfficeRouter.use("/users", usersRouter);
backOfficeRouter.use("/ingredients", ingredientsRouter);
backOfficeRouter.use("/medias", mediasRouter);
backOfficeRouter.use("/categories", categoryRouter);
backOfficeRouter.use("/recipes", recipesRouter);
backOfficeRouter.use("/", authRouter);

export default backOfficeRouter;
