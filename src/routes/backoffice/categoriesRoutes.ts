import express from "express";
import categoryController from "../../controllers/backoffice/categoriesController";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);

export default categoryRouter;