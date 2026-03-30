import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Utökar Request-typen så vi kan lägga till user på req
export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Hämta token från Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Plocka ut själva token (tar bort "Bearer ")
    const token = authHeader.split(' ')[1];

    // Verifiera token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string };

    // Lägg användarinfo på req så routes kan använda den
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware; 