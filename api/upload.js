import { verifyAdminToken } from './_lib/auth.js';
import { uploadToCloudinary, isCloudinaryConfigured } from './_lib/cloudinary.js';

// Vercel Serverless Function config for parsing larger image payload
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // 1. Verify Admin authentication
    const auth = verifyAdminToken(req);
    if (!auth.valid) {
      return res.status(401).json({
        error: 'Unauthorized: Admin authentication required to upload images.',
        details: auth.error
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { image, folder } = body || {};

    if (!image) {
      return res.status(400).json({ error: 'Image data is required (base64 string or data URI).' });
    }

    if (!isCloudinaryConfigured) {
      return res.status(500).json({
        error: 'Cloudinary credentials are not configured on the server. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
      });
    }

    // 2. Upload to Cloudinary
    const targetFolder = folder || 'ashok_portfolio/artworks';
    const uploadResult = await uploadToCloudinary(image, targetFolder);

    return res.status(200).json({
      success: true,
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format
    });
  } catch (error) {
    console.error('API /api/upload error:', error);
    return res.status(500).json({
      error: 'Image upload failed',
      message: error.message
    });
  }
}
