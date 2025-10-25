// server/utils/generateToken.js
import jwt from 'jsonwebtoken';
import Session from '../models/Session.js';

export const generateToken = async (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });

  // Calculate expiration date (30 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  // Create session in database
  await Session.create({
    userId,
    token,
    expiresAt,
  });

  return token;
};

export const deleteSession = async (token) => {
  await Session.deleteOne({ token });
};
