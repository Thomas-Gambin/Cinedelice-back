import express from "express";
import dashboardRoutes from "./dashboardRoutes";

const router = express.Router();

router.use("/dashboard", dashboardRoutes);

export default router;
