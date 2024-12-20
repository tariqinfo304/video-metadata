import { Request, Response, NextFunction } from 'express';

export const validateVideoFields = (req: Request, res: Response, next: NextFunction): void => {
  const { title, description, duration, genre, tags } = req.body;

  if (!title || title.trim() === '') {
    res.status(400).json({ message: 'Title is required and cannot be empty' });
    return;
  }

  if (!description || description.trim() === '') {
    res.status(400).json({ message: 'Description is required and cannot be empty' });
    return;
  }

  if (!duration || isNaN(duration) || duration <= 0) {
    res.status(400).json({ message: 'Duration is required and must be a positive number' });
    return;
  }

  if (!genre || genre.trim() === '') {
    res.status(400).json({ message: 'Genre is required and cannot be empty' });
    return;
  }

  if (!tags || tags.trim() === '') {
    res.status(400).json({ message: 'Tags are required and cannot be empty' });
    return;
  }

  // If validation passes, call next middleware
  next();
};
