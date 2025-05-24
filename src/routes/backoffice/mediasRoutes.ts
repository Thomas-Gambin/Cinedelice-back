import express from 'express';
import mediasController from '../../controllers/backoffice/mediasController';
import { isAdmin } from '../../middlewares/backoffice/isAdmin';

const mediasRouter = express.Router();

mediasRouter.use(isAdmin);
mediasRouter.get("/", mediasController.getAllMedias);
mediasRouter.post("/create", mediasController.createMedia);
mediasRouter.post("/:id/edit", mediasController.updateMedia);
mediasRouter.post("/:id", mediasController.deleteMedia);

export default mediasRouter;