import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Example middleware to verify JWT token
export const authMiddleware = (req: any, res: Response, next: NextFunction): any => {
  // Extract token from Authorization header (e.g., "Bearer <token>")
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    // No token provided, return 401 Unauthorized
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token with the secret key (use your secret key here)
    const decoded = jwt.verify(token, 'your-secret-key');

    // Optionally, store the decoded user in the request object for later use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Invalid token, return 403 Forbidden
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
