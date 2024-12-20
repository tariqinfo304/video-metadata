import { Request, Response } from 'express';
import { generateToken } from '../utils/authUtils';



export const getToken = async (req: Request, res: Response) => {
  try {
   const token = generateToken("1209")
    res.status(201).json({ message: 'Token Created', token: token });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};