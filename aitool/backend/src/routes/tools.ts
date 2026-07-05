import { Router, Response } from 'express';
import Tool from '../models/Tool';
import Review from '../models/Review';
import { authMiddleware, adminOnly, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// ── GET ALL TOOLS (with optional search, category filters) ──────
router.get('/', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query: any = {};

        if (category && category !== 'all') {
            query.category = category;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const tools = await Tool.find(query).sort({ title: 1 }).lean();
        
        // Map isNewTool back to isNew for the frontend
        const mappedTools = tools.map((t: any) => ({
            ...t,
            isNew: t.isNewTool
        }));
        
        return res.json(mappedTools);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// ── GET SINGLE TOOL DETAILS ──────────────────────────────────
router.get('/:id', async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id).lean();
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found.' });
        }
        
        const mappedTool = {
            ...(tool as any),
            isNew: (tool as any).isNewTool
        };
        
        return res.json(mappedTool);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// ── ADMIN CREATE NEW TOOL ────────────────────────────────────
router.post('/', authMiddleware, adminOnly, async (req: AuthenticatedRequest, res) => {
    try {
        if ('isNew' in req.body) {
            req.body.isNewTool = req.body.isNew;
            delete req.body.isNew;
        }
        const tool = new Tool(req.body);
        await tool.save();
        return res.status(201).json(tool);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

// ── ADMIN UPDATE TOOL ────────────────────────────────────────
router.put('/:id', authMiddleware, adminOnly, async (req: AuthenticatedRequest, res) => {
    try {
        if ('isNew' in req.body) {
            req.body.isNewTool = req.body.isNew;
            delete req.body.isNew;
        }
        const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found.' });
        }
        return res.json(tool);
    } catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
});

// ── ADMIN DELETE TOOL ────────────────────────────────────────
router.delete('/:id', authMiddleware, adminOnly, async (req: AuthenticatedRequest, res) => {
    try {
        const tool = await Tool.findByIdAndDelete(req.params.id);
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found.' });
        }
        // Delete nested reviews
        await Review.deleteMany({ toolId: tool._id });
        return res.json({ message: 'Tool and its reviews deleted successfully.' });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// ── USER SUBMIT A REVIEW ─────────────────────────────────────
router.post('/:id/reviews', authMiddleware, async (req: AuthenticatedRequest, res) => {
    try {
        const toolId = req.params.id;
        const tool = await Tool.findById(toolId);
        if (!tool) {
            return res.status(404).json({ error: 'Tool not found.' });
        }

        const { rating, comment } = req.body;
        if (!rating || rating < 1 || rating > 5 || !comment) {
            return res.status(400).json({ error: 'Rating (1-5) and comment are required.' });
        }

        const review = new Review({
            toolId,
            userId: req.user!.uid,
            userName: req.user!.name,
            rating,
            comment,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        });
        await review.save();

        // Re-calculate average rating for the Tool
        const reviews = await Review.find({ toolId });
        const avg = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
        tool.rating = parseFloat(avg.toFixed(1));
        await tool.save();

        return res.status(201).json(review);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

// ── GET TOOL REVIEWS ──────────────────────────────────────────
router.get('/:id/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ toolId: req.params.id }).sort({ createdAt: -1 });
        return res.json(reviews);
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
