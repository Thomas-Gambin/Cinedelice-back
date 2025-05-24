import express from 'express';
import ingredientsController from '../../controllers/backoffice/ingredientsController';
import { isAdmin } from '../../middlewares/backoffice/isAdmin';

const ingredientsRouter = express.Router();

ingredientsRouter.use(isAdmin);
ingredientsRouter.get('/', ingredientsController.getAllIngredients);
ingredientsRouter.post('/create', ingredientsController.createIngredient);
ingredientsRouter.post('/:id', ingredientsController.deleteIngredient);
ingredientsRouter.post('/:id/edit', ingredientsController.updateIngredient);

export default ingredientsRouter;