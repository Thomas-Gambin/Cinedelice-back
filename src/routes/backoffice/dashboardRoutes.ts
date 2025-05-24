import express from "express";
import dashboardController from "../../controllers/backoffice/dashboardController";
import { isAdmin } from "../../middlewares/backoffice/isAdmin";

const router = express.Router();

router.use(isAdmin);
router.get("/", dashboardController.getDashboardData);

export default router;
