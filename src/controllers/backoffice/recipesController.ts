import type { Request, Response } from "express";
import { Recipe, RecipeCategory, RecipeComposition, Ingredient, RecipeStep } from "../../database/association";

export default {
	getAllRecipes: async (_req: Request, res: Response) => {
		try {
			const [recipes, categories, ingredients] = await Promise.all([
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
                Ingredient.findAll({
                    attributes: ["id", "name"],
                    order: [["name", "ASC"]],
                }),
			]);

			res.render("recipesPage", { recipes, categories, ingredients });
		} catch (error) {
			console.error("Erreur lors de la récupération des recettes :", error);
			res.status(500).json({ error: "Erreur serveur" });
		}
	},

    createRecipe: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, categoryId, description, coverImg, compositions = [], steps = [] } = req.body;
        
            const newRecipe = await Recipe.create({
                name,
                categoryId,
                description,
                coverImg,
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
            const { name, categoryId, description, coverImg, compositions = [], steps = [] } = req.body;
            const { id } = req.params;
    
            if (!id) {
                res.status(400).json({ error: "ID de recette manquant" });
                return;
            }
    
            const recipe = await Recipe.findByPk(id);
            if (!recipe) {
                res.status(404).json({ error: "Recette non trouvée" });
                return;
            }
    
            const updateData: Partial<typeof Recipe.prototype> = {};
            if (name?.trim()) updateData.name = name;
            if (categoryId) updateData.categoryId = categoryId;
            if (coverImg?.trim()) updateData.coverImg = coverImg;
            if (description?.trim()) updateData.description = description;
    
            if (Object.keys(updateData).length > 0) {
                await Recipe.update(updateData, { where: { id } });
            }
    
            if (Array.isArray(compositions) && compositions.length > 0) {
                await RecipeComposition.destroy({ where: { recipeId: id } });
                for (const comp of compositions) {
                    if (comp.ingredientId && comp.quantity && comp.unit) {
                        await RecipeComposition.create({
                            recipeId: Number(id),
                            ingredientId: comp.ingredientId,
                            quantity: comp.quantity,
                            unit: comp.unit,
                        });
                    }
                }
            }
    
            if (Array.isArray(steps) && steps.length > 0) {
                await RecipeStep.destroy({ where: { recipeId: id } });
                for (const [index, step] of steps.entries()) {
                    if (step.description?.trim()) {
                        await RecipeStep.create({
                            recipeId: Number(id),
                            description: step.description,
                            order: index + 1,
                        });
                    }
                }
            }
    
            res.redirect("/backoffice/recipes");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la recette :", error);
            res.status(500).json({ error: "Erreur serveur" });
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
