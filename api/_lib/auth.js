import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.AUTH_SECRET || process.env.JWT_SECRET || 'ashok_portfolio_super_secure_jwt_secret_2026';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'ashokk.profile.in@gmail.com').toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '2006@ashok';

/**
 * Validate admin credentials and return signed JWT token if valid.
 */
export function authenticateAdmin(email, password) {
  const cleanEmail = (email || '').toLowerCase().trim();
  if (cleanEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { 
        email: cleanEmail, 
        role: 'admin',
        name: 'Ashok K'
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );
    return {
      authenticated: true,
      token,
      user: {
        email: cleanEmail,
        role: 'admin',
        name: 'Ashok K'
      }
    };
  }
  return {
    authenticated: false,
    error: 'Invalid admin email or password. Access is restricted.'
  };
}

/**
 * Verify JWT token from request headers.
 */
export function verifyAdminToken(req) {
  try {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else if (req.cookies?.admin_token) {
      token = req.cookies.admin_token;
    } else if (req.query?.token) {
      token = req.query.token;
    }

    if (!token) {
      return { valid: false, error: 'No authorization token provided.' };
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.role === 'admin') {
      return { valid: true, user: decoded };
    }
    return { valid: false, error: 'Invalid token privileges.' };
  } catch (err) {
    return { valid: false, error: err.message || 'Token verification failed.' };
  }
}
