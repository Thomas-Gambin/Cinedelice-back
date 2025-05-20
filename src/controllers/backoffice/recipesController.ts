import type { Request, Response } from "express";
import { Recipe, RecipeCategory, RecipeComposition, Ingredient, RecipeStep } from "../../database/association";

export default {
	getAllRecipes: async (_req: Request, res: Response) => {
		try {
			const [recipes, categories] = await Promise.all([
				Recipe.findAll({
                    attributes: ["id", "name", "coverImg", "description", "categoryId", "actif", "createdAt"],
                    include: [
                        { model: RecipeCategory, as: "Category", attributes: ["name"] },
                        {
                            model: RecipeComposition,
                            as: "Compositions",
                            include: [{ model: Ingredient, as: "Ingredient", attributes: ["name"] }],
                        },
                        { model: RecipeStep, as: "Steps", attributes: ["description"] },
                    ],
                    order: [["name", "ASC"]],
                }),
                
				RecipeCategory.findAll({
					attributes: ["id", "name"],
					order: [["name", "ASC"]],
				}),
			]);

			res.render("recipesPage", { recipes, categories });
		} catch (error) {
			console.error("Erreur lors de la récupération des recettes :", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},

    createRecipe: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, categoryId, description, compositions = [], steps = [] } = req.body;
        
            const newRecipe = await Recipe.create({
                name,
                categoryId,
                description,
                actif: true,
            });
        
            for (const comp of compositions) {
                await RecipeComposition.create({
                recipeId: newRecipe.id,
                ingredientId: comp.ingredientId,
                quantity: comp.quantity,
                unit: comp.unit,
                });
            }
        
            for (const [index, step] of steps.entries()) {
                await RecipeStep.create({
                recipeId: newRecipe.id,
                description: step.description,
                order: index + 1,
                });
            }
        
            res.redirect('/backoffice/recipes');
        } catch (error) {
            console.error('Erreur lors de la création de la recette :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    },
    
    updateRecipe: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, categoryId, description, compositions = [], steps = [] } = req.body;
            const { id } = req.params;
    
            if (!id) {
                res.status(400).json({ error: "ID de recette manquant" });
                return;
            }
    
            await Recipe.update({ name, categoryId, description }, { where: { id } });
    
            await RecipeComposition.destroy({ where: { recipeId: id } });
            for (const comp of compositions) {
                await RecipeComposition.create({
                    recipeId: id,
                    ingredientId: comp.ingredientId,
                    quantity: comp.quantity,
                    unit: comp.unit,
                });
            }
    
            await RecipeStep.destroy({ where: { recipeId: id } });
            for (const [index, step] of steps.entries()) {
                await RecipeStep.create({
                    recipeId: id,
                    description: step.description,
                    order: index + 1,
                });
            }
    
            res.redirect('/backoffice/recipes');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la recette :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    },    

    deleteRecipe: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            await Recipe.destroy({ where: { id } });

            res.redirect('/backoffice/recipes');
        } catch (error) {
            console.error('Erreur lors de la suppression de la recette :', error);
            res.status(500).json({ error: 'Erreur serveur' });
        }
    }
};
