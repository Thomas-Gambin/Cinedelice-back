import express from "express";
import recipeController from "../../controllers/backoffice/recipesController";
import { isAdmin } from "../../middlewares/backoffice/isAdmin";

const recipesRouter = express.Router();

recipesRouter.use(isAdmin);
recipesRouter.get("/", recipeController.getAllRecipes);
recipesRouter.post("/create", recipeController.createRecipe);
recipesRouter.post("/:id", recipeController.deleteRecipe);
recipesRouter.post("/:id/edit", recipeController.updateRecipe);

export default recipesRouter;