import type { Request, Response } from 'express';
import { Recipe, User, Media, Ingredient, RecipeCategory } from '../../database/association';

export default { 
    getDashboardData: async (_req: Request, res: Response) => {
    try {
        const [recipesCount, usersCount, mediasCount, ingredientsCount, categoriesCount] = await Promise.all([
            Recipe.count(),
            User.count(),
            Media.count(),
            Ingredient.count(),
            RecipeCategory.count(),
        ]);

        res.render('dashboard', {
            recipesCount,
            usersCount,
            mediasCount,
            ingredientsCount,
            categoriesCount,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},
};