import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export interface AuthenticatedRequest extends Request {
    user?: {
        uid: string;
        email?: string;
        name?: string;
        role?: 'admin' | 'user';
    };
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify Firebase Token
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        // Setup user details from Firebase token
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || (decodedToken.email ? decodedToken.email.split('@')[0] : 'User'),
            // Standardize admin checks: admin@aitoolshub.com is hardcoded admin, or custom claims
            role: decodedToken.email === 'admin@aitoolshub.com' || decodedToken.admin === true ? 'admin' : 'user'
        };

        next();
    } catch (error) {
        console.error('❌ Authentication Middleware Token Verification Failed:', error);
        return res.status(403).json({ error: 'Invalid or expired authentication token.' });
    }
};

export const adminOnly = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    next();
};
