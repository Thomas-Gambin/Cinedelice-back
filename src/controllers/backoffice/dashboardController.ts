import type { Request, Response } from 'express';
import { Recipe, User, Media } from '../../database/association';

export default { 
    getDashboardData: async (_req: Request, res: Response) => {
    try {
        const [recipesCount, usersCount, mediasCount] = await Promise.all([
            Recipe.count(),
            User.count(),
            Media.count(),
        ]);

        res.render('dashboard', {
            recipesCount,
            usersCount,
            mediasCount,
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},
};