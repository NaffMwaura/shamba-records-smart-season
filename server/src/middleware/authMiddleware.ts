import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role: string;
}

// Guard 1: Is the user logged in?
export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined; // Explicitly define the type

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Prove to TS that token exists here
      if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET not configured');
      }

      // Now TS knows 'token' and 'secret' are both strings!
      const decoded = jwt.verify(token, secret) as any;

      req.user = { id: decoded.id, role: decoded.role };
      return next(); // Use return to ensure the function stops here
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If the code reaches here, it means no 'Bearer' header was found
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
// Guard 2: Is the user an Admin?
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};