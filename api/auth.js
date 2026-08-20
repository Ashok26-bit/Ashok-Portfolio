import { authenticateAdmin, verifyAdminToken } from './_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 1. POST: Admin Login
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { email, password } = body || {};

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required.'
        });
      }

      const result = authenticateAdmin(email, password);
      if (result.authenticated) {
        return res.status(200).json({
          success: true,
          token: result.token,
          user: result.user,
          message: 'Admin authenticated successfully.'
        });
      } else {
        return res.status(401).json({
          success: false,
          error: result.error || 'Invalid admin credentials. Access restricted.'
        });
      }
    }

    // 2. GET: Token verification / check active session
    if (req.method === 'GET') {
      const auth = verifyAdminToken(req);
      if (auth.valid) {
        return res.status(200).json({
          authenticated: true,
          user: auth.user
        });
      }
      return res.status(200).json({
        authenticated: false,
        error: auth.error
      });
    }

    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API /api/auth error:', error);
    return res.status(500).json({
      error: 'Internal Server Error in auth endpoint',
      message: error.message
    });
  }
}
