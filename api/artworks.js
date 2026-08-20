import { getDatabase } from './_lib/mongodb.js';
import { verifyAdminToken } from './_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const db = await getDatabase();

    // 1. POST: Admin adds artwork
    if (req.method === 'POST') {
      const auth = verifyAdminToken(req);
      if (!auth.valid) {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { title, category, description, imageUrl, dateAdded } = body || {};

      if (!title || !imageUrl) {
        return res.status(400).json({ error: 'Title and imageUrl are required.' });
      }

      const newArtwork = {
        id: `art-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: title.trim(),
        category: category || 'Sketches',
        description: (description || '').trim(),
        imageUrl: imageUrl.trim(),
        dateAdded: dateAdded || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        createdAt: new Date()
      };

      if (db) {
        const collection = db.collection('portfolio_content');
        await collection.updateOne(
          { key: 'main_portfolio' },
          { $push: { artworks: { $each: [newArtwork], $position: 0 } } }
        );
      }

      return res.status(200).json({
        success: true,
        message: 'Artwork added successfully.',
        artwork: newArtwork
      });
    }

    // 2. DELETE: Admin deletes artwork
    if (req.method === 'DELETE') {
      const auth = verifyAdminToken(req);
      if (!auth.valid) {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
      }

      const { id } = req.query || {};
      if (!id) {
        return res.status(400).json({ error: 'Artwork ID is required in query params.' });
      }

      if (db) {
        const collection = db.collection('portfolio_content');
        await collection.updateOne(
          { key: 'main_portfolio' },
          { $pull: { artworks: { id } } }
        );
      }

      return res.status(200).json({ success: true, message: 'Artwork deleted.' });
    }

    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API /api/artworks error:', error);
    return res.status(500).json({
      error: 'Internal Server Error in artworks endpoint',
      message: error.message
    });
  }
}
