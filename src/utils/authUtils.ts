import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};
