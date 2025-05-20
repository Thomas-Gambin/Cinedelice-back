import express from "express";
import recipeController from "../../controllers/backoffice/recipesController";

const recipesRouter = express.Router();

recipesRouter.get("/", recipeController.getAllRecipes);

export default recipesRouter;