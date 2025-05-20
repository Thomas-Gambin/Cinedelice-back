import express from "express";
import categoryController from "../../controllers/backoffice/categoriesController";

const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/create", categoryController.createCategory);

export default categoryRouter;