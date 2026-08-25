import { getDatabase } from './_lib/mongodb.js';
import { verifyAdminToken } from './_lib/auth.js';
import { DEFAULT_PORTFOLIO_DATA } from './_lib/defaultData.js';

export default async function handler(req, res) {
  // Enable CORS headers for API calls
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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

    // 1. GET: Fetch public portfolio content from MongoDB
    if (req.method === 'GET') {
      if (!db) {
        // Return default data gracefully if MongoDB is not connected
        return res.status(200).json({
          source: 'default',
          data: DEFAULT_PORTFOLIO_DATA
        });
      }

      const collection = db.collection('portfolio_content');
      let doc = await collection.findOne({ key: 'main_portfolio' });

      if (!doc) {
        // First-time seed into MongoDB
        try {
          const initialDoc = {
            key: 'main_portfolio',
            ...DEFAULT_PORTFOLIO_DATA,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          await collection.insertOne(initialDoc);
          doc = initialDoc;
        } catch (seedErr) {
          console.warn('Seeding warning:', seedErr);
          doc = { key: 'main_portfolio', ...DEFAULT_PORTFOLIO_DATA };
        }
      }

      const artworkTitlesToRemove = new Set([
        'Traditional Charcoal & Graphite Study',
        'Devotional Mandala & Indian Heritage Art'
      ]);
      const filteredArtworks = Array.isArray(doc.artworks)
        ? doc.artworks.filter((artwork) => !artworkTitlesToRemove.has(artwork.title))
        : doc.artworks;

      if (Array.isArray(doc.artworks) && filteredArtworks.length !== doc.artworks.length) {
        await collection.updateOne(
          { key: 'main_portfolio' },
          { $set: { artworks: filteredArtworks, updatedAt: new Date() } }
        );
      }

      const { _id, key, createdAt, updatedAt, ...cleanData } = doc;
      cleanData.artworks = filteredArtworks;
      return res.status(200).json({
        source: 'mongodb',
        updatedAt: updatedAt || new Date(),
        data: cleanData
      });
    }

    // 2. PUT / POST: Update portfolio content (Admin Only)
    if (req.method === 'PUT' || req.method === 'POST') {
      const auth = verifyAdminToken(req);
      if (!auth.valid) {
        return res.status(401).json({
          error: 'Unauthorized: Admin authentication required to update portfolio.',
          details: auth.error
        });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const {
        profile,
        about,
        projects,
        skillCategories,
        experiences,
        certifications,
        education,
        artworks
      } = body;

      const updatePayload = {
        updatedAt: new Date(),
        updatedBy: auth.user.email
      };

      if (profile !== undefined) updatePayload.profile = profile;
      if (about !== undefined) updatePayload.about = about;
      if (projects !== undefined) updatePayload.projects = projects;
      if (skillCategories !== undefined) updatePayload.skillCategories = skillCategories;
      if (experiences !== undefined) updatePayload.experiences = experiences;
      if (certifications !== undefined) updatePayload.certifications = certifications;
      if (education !== undefined) updatePayload.education = education;
      if (artworks !== undefined) updatePayload.artworks = artworks;

      if (!db) {
        return res.status(500).json({
          error: 'Database connection failed. Please ensure MONGODB_URI is configured.'
        });
      }

      const collection = db.collection('portfolio_content');
      await collection.updateOne(
        { key: 'main_portfolio' },
        { $set: updatePayload },
        { upsert: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Portfolio updated successfully in MongoDB Atlas.',
        updatedAt: updatePayload.updatedAt
      });
    }

    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API /api/portfolio error:', error);
    return res.status(500).json({
      error: 'Internal Server Error in portfolio endpoint',
      message: error.message
    });
  }
}
