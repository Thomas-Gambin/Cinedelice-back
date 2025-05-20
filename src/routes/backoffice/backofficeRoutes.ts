import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import usersRouter from "./usersRoutes";
import ingredientsRouter from "./ingredientsRoutes";
import mediasRouter from "./mediasRoutes";
import categoryRouter from "./categoriesRoutes";

const backOfficeRouter = express.Router();

backOfficeRouter.use("/dashboard", dashboardRoutes);
backOfficeRouter.use("/users", usersRouter);
backOfficeRouter.use("/ingredients", ingredientsRouter);
backOfficeRouter.use("/medias", mediasRouter);
backOfficeRouter.use("/categories", categoryRouter);

export default backOfficeRouter;
