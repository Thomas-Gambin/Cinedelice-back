import express from "express";
import categoryController from "../../controllers/backoffice/categoriesController";
import { isAdmin } from "../../middlewares/backoffice/isAdmin";

const categoryRouter = express.Router();

categoryRouter.use(isAdmin);

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.post("/create", categoryController.createCategory);
categoryRouter.post("/:id/edit", categoryController.updateCategory);
categoryRouter.post("/:id", categoryController.deleteCategory);

export default categoryRouter;