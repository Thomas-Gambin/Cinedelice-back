import type { Request, Response } from 'express';
import { Ingredient } from '../../database/association';

export default {
    getAllIngredients: async (_req: Request, res: Response) => {
        try {
            const ingredients = await Ingredient.findAll({
                attributes: ['id', 'name'],
                order: [['name', 'ASC']]
            });
            res.render('ingredientsPage', { ingredients });
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
} 
