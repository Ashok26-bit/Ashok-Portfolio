import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
} else {
  console.warn('⚠️ Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not fully configured.');
}

/**
 * Upload an image (base64 string, data URI, or remote URL) to Cloudinary.
 */
export async function uploadToCloudinary(fileStr, folder = 'ashok_portfolio') {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET on the server.');
  }

  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    folder: folder,
    resource_type: 'auto',
    transformation: [
      { quality: 'auto:good' },
      { fetch_format: 'auto' }
    ]
  });

  return {
    secure_url: uploadResponse.secure_url,
    public_id: uploadResponse.public_id,
    width: uploadResponse.width,
    height: uploadResponse.height,
    format: uploadResponse.format
  };
}

export default cloudinary;
