import express from "express";
import dashboardRoutes from "./dashboardRoutes";
import usersRouter from "./usersRoutes";
import ingredientsRouter from "./ingredientsRoutes";

const backOfficeRouter = express.Router();

backOfficeRouter.use("/dashboard", dashboardRoutes);
backOfficeRouter.use("/users", usersRouter);
backOfficeRouter.use("/ingredients", ingredientsRouter);

export default backOfficeRouter;
