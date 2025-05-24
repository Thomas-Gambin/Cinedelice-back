import type { Request, Response } from "express";
import argon2 from "argon2";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "../../utils/dotenv";
import { User } from "../../database/association";

export default {
	showLoginPage: (_req: Request, res: Response) => {
		res.render("loginPages", { error: null });
	},

	login: async (req: Request, res: Response) => {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({
				where: { email },
				attributes: ["id", "email", "password", "username", "role"],
			});

			if (!user || user.role !== "admin") {
				return res.status(401).render("loginPages", {
					error: "Accès réservé aux administrateurs.",
				});
			}

			const isPasswordValid = await argon2.verify(user.password, password);

			if (!isPasswordValid) {
				return res.status(401).render("loginPages", {
					error: "Email ou mot de passe incorrect.",
				});
			}

			const token = jsonwebtoken.sign(
				{
					id: user.id,
					email: user.email,
					username: user.username,
					role: user.role,
				},
				dotenv.JWT.SECRET,
				{ expiresIn: "1h" }
			);

			res.cookie("token", token, { httpOnly: true });
			res.redirect("/backoffice/dashboard");
		} catch (error) {
			console.error("Erreur de connexion admin :", error);
			res.status(500).render("loginPages", {
				error: "Erreur serveur",
			});
		}
	},

	logout: (_req: Request, res: Response) => {
		res.clearCookie("token");
		res.redirect("/backoffice/login");
	},
};
