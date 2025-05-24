import { Router } from "express";
import authController from "../../controllers/backoffice/authController";

const authRouter = Router();

authRouter.get("/login", authController.showLoginPage);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
