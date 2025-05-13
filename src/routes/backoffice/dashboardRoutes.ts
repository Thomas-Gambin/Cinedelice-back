import express from "express";
import dashboardController from "../../controllers/backoffice/dashboardController";

const router = express.Router();

router.get("/", dashboardController.getDashboardData);

export default router;
