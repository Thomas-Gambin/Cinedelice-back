import type { NextFunction, Request, Response } from "express";

export const isActive = (req: Request, res: Response, next: NextFunction) => {
        res.locals.currentPath = req.path;
        next();
}