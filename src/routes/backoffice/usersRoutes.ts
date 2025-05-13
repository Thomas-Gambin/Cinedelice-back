import express from 'express';
import usersController from '../../controllers/backoffice/usersController';

const usersRouter = express.Router();

usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/:id', usersController.deleteUser);

export default usersRouter;