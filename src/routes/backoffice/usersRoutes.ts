import express from 'express';
import usersController from '../../controllers/backoffice/usersController';
import { isAdmin } from '../../middlewares/backoffice/isAdmin';

const usersRouter = express.Router();

usersRouter.use(isAdmin);
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/:id', usersController.deleteUser);

export default usersRouter;