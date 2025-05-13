import express from 'express';

const backofficeRouter = express.Router();

backofficeRouter.get('/', (req, res) => {
    res.render('dashboard');
});

export default backofficeRouter;