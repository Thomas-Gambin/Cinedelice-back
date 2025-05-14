import express from 'express';
import ingredientsController from '../../controllers/backoffice/ingredientsController';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/', ingredientsController.getAllIngredients);
ingredientsRouter.post('/create', ingredientsController.createIngredient);
ingredientsRouter.post('/:id', ingredientsController.deleteIngredient);
ingredientsRouter.post('/:id/edit', ingredientsController.updateIngredient);

export default ingredientsRouter;