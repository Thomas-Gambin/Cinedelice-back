import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "../../utils/dotenv";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;

	if (!token) {
		res.locals.admin = null;
		return res.redirect("/backoffice/login");
	}

	try {
		const decoded = jwt.verify(token, dotenv.JWT.SECRET) as {
			id: number;
			email: string;
			username: string;
			role: string;
		};

		if (decoded.role !== "admin") {
			res.locals.admin = null;
			return res.redirect("/backoffice/login");
		}

		req.user = decoded;
		res.locals.admin = {
			id: decoded.id,
			email: decoded.email,
			username: decoded.username,
		};

		next();
	} catch (error) {
		console.error("Erreur de vérification du token admin :", error);
		res.locals.admin = null;
		return res.redirect("/backoffice/login");
	}
};
