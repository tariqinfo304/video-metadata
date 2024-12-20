import { Router } from 'express';
import { getToken } from '../controllers/authController';

const router = Router();

router.get('/getToken', getToken);


export default router;
