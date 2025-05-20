import type { Request, Response } from 'express';
import { Recipe, RecipeCategory } from '../../database/association';

export default {
    getAllRecipes: async (_req: Request, res: Response) => {
        try {
            const recipes = await Recipe.findAll({
            include: [{ model: RecipeCategory, as: "Category", attributes: ["name"] }],
            order: [["name", "ASC"]],
        });

        const categories = await RecipeCategory.findAll({ order: [["name", "ASC"]] });
        res.render("recipesPage", { recipes, categories });
        
        } catch (err) {
        console.error("Erreur getAllRecipes:", err);
        res.status(500).json({ error: "Erreur serveur" });
        }
    }
}