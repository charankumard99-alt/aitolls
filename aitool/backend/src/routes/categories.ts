import { Router } from 'express';
import Category from '../models/Category';
import { authMiddleware, adminOnly, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// ── GET ALL CATEGORIES ───────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ title: 1 });
        return res.json(categories);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// ── ADMIN CREATE CATEGORY ────────────────────────────────────
router.post('/', authMiddleware, adminOnly, async (req: AuthenticatedRequest, res) => {
    try {
        const { title, icon, slug } = req.body;
        if (!title || !icon || !slug) {
            return res.status(400).json({ error: 'Title, icon, and slug are required.' });
        }

        const category = new Category({ title, icon, slug });
        await category.save();
        return res.status(201).json(category);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

// ── ADMIN UPDATE CATEGORY ────────────────────────────────────
router.put('/:id', authMiddleware, adminOnly, async (req: AuthenticatedRequest, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }
        return res.json(category);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

// ── ADMIN DELETE CATEGORY ────────────────────────────────────
router.delete('/:id', authMiddleware, adminOnly, async (req: AuthenticatedRequest, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found.' });
        }
        return res.json({ message: 'Category deleted successfully.' });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
