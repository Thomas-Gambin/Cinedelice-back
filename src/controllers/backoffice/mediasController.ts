import type { Request, Response } from 'express';
import { Media } from "../../database/association"

export default {
    getAllMedias: async (req: Request, res: Response) => {
        try {
            const medias = await Media.findAll({
            attributes: ['id', 'title', 'coverImage', 'anecdote'],
            order: [['title', 'ASC']]
            });
            res.render('mediasPage', { medias });
        } catch (error) {
            console.error('Error fetching medias:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createMedia: async (req: Request, res: Response) : Promise<void> => {
        const { title, coverImage, anecdote } = req.body;
        try {
            if (!title || !coverImage || !anecdote) {
                res.status(400).json({ error: 'Title, coverImage and anecdote are required' });
                return;
            }
            const media = await Media.create({
                title,
                coverImage,
                anecdote
            });

            res.redirect('/backoffice/medias');
            
            res.status(201).json(media);
        } catch (error) {
            console.error('Error creating media:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateMedia: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
        const { title, coverImage, anecdote } = req.body;
        try {
            const media = await Media.findByPk(id);
            if (!media) {
                res.status(404).json({ error: 'Media not found' });
                return;
            }
            media.title = title;
            media.coverImage = coverImage;
            media.anecdote = anecdote;

            await media.save();

            res.redirect('/backoffice/medias');

            res.status(200).json(media);
        } catch (error) {
            console.error('Error updating media:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteMedia: async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
        try {
            const media = await Media.findByPk(id);
            if (!media) {
                res.status(404).json({ error: 'Media not found' });
                return;
            }
            await media.destroy();

            res.redirect('/backoffice/medias');

            res.status(200).json({ message: 'Media deleted successfully' });
        } catch (error) {
            console.error('Error deleting media:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}