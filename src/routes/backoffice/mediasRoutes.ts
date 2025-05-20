import express from 'express';
import mediasController from '../../controllers/backoffice/mediasController';

const mediasRouter = express.Router();
mediasRouter.get("/", mediasController.getAllMedias);
mediasRouter.post("/create", mediasController.createMedia);
mediasRouter.post("/:id/edit", mediasController.updateMedia);
mediasRouter.post("/:id", mediasController.deleteMedia);

export default mediasRouter;