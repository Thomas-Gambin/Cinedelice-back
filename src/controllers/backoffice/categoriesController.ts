import type { Request, Response } from "express";
import { RecipeCategory } from "../../database/association";

export default {
    getAllCategories: async (_req: Request, res: Response) => {
        try {
            const categories = await RecipeCategory.findAll({
                order: [["name", "ASC"]],
            });
            res.render("categoriesPage", { categories });
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

}