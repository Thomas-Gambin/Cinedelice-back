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
    deleteIngredient: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
        try {
            const ingredient = await Ingredient.findByPk(id);
            if (!ingredient) {
                res.status(404).json({ error: 'Ingredient not found' });
                return;
            }
            await ingredient.destroy();

            res.redirect('/backoffice/ingredients');
            
            res.status(200).json({ message: 'Ingredient deleted successfully' });
        } catch (error) {
            console.error('Error deleting ingredient:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    updateIngredient: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const ingredient = await Ingredient.findByPk(id);
            if (!ingredient) {
                res.status(404).json({ error: 'Ingredient not found' });
                return;
            }
            ingredient.name = name;
            await ingredient.save();

            res.redirect('/backoffice/ingredients');
            
            res.status(200).json({ message: 'Ingredient updated successfully' });
        } catch (error) {
            console.error('Error updating ingredient:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
} 
