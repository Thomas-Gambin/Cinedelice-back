import type { Request, Response } from 'express';
import { User } from '../../database/association';

export default {
    getAllUsers: async (_req: Request, res: Response) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'username','email', 'role'],
                order: [['username', 'ASC']]
            })

            res.render('usersPage', { users });
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteUser: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;

        try {
            const user = await User.findByPk(id)
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }

            await user.destroy();

            res.redirect('/backoffice/users');

            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}