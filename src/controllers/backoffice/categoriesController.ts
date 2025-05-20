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

    createCategory: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            await RecipeCategory.create({ name });
            res.redirect("/backoffice/categories");
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    updateCategory: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const category = await RecipeCategory.findByPk(id);
            if (!category) {
                res.status(404).json({ error: "Catégorie non trouvée" });
                return;
            }
            category.name = name;
            await category.save();
            
            res.redirect("/backoffice/categories");
        } catch (error) {
            console.error("Erreur lors de la création de la catégorie :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },

    deleteCategory: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
        try {
            const category = await RecipeCategory.findByPk(id);
            if (!category) {
                res.status(404).json({ error: "Catégorie non trouvée" });
                return;
            }
            await category.destroy();
            
            res.redirect("/backoffice/categories");

            res.status(200).json({ message: "Catégorie supprimée avec succès" });
        } catch (error) {
            console.error("Erreur lors de la suppression de la catégorie :", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    },
}