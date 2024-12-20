// src/types/express.d.ts or src/express.d.ts

import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // You can specify a more precise type here if necessary, e.g., a User interface
    }
  }
}
