import { getDatabase } from './_lib/mongodb.js';
import { verifyAdminToken } from './_lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST');
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

    // 1. POST: Public visitor submits a contact message
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, email, subject, message } = body || {};

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required fields.' });
      }

      const newMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: name.trim(),
        email: email.trim(),
        subject: (subject || 'General Inquiry').trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        isRead: false
      };

      if (db) {
        const collection = db.collection('contact_messages');
        await collection.insertOne(newMessage);
      }

      return res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully to Ashok K.',
        data: newMessage
      });
    }

    // 2. GET: Admin views all received contact messages
    if (req.method === 'GET') {
      const auth = verifyAdminToken(req);
      if (!auth.valid) {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
      }

      if (!db) {
        return res.status(200).json({ messages: [] });
      }

      const collection = db.collection('contact_messages');
      const messages = await collection.find({}).sort({ timestamp: -1 }).toArray();

      return res.status(200).json({
        messages: messages.map(({ _id, ...m }) => m)
      });
    }

    // 3. PATCH: Admin marks message as read
    if (req.method === 'PATCH') {
      const auth = verifyAdminToken(req);
      if (!auth.valid) {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { id, isRead } = body || {};

      if (!id) {
        return res.status(400).json({ error: 'Message ID is required.' });
      }

      if (db) {
        const collection = db.collection('contact_messages');
        await collection.updateOne({ id }, { $set: { isRead: Boolean(isRead) } });
      }

      return res.status(200).json({ success: true, message: 'Message updated.' });
    }

    // 4. DELETE: Admin deletes a message
    if (req.method === 'DELETE') {
      const auth = verifyAdminToken(req);
      if (!auth.valid) {
        return res.status(401).json({ error: 'Unauthorized: Admin authentication required.' });
      }

      const { id } = req.query || {};
      if (!id) {
        return res.status(400).json({ error: 'Message ID is required in query params.' });
      }

      if (db) {
        const collection = db.collection('contact_messages');
        await collection.deleteOne({ id });
      }

      return res.status(200).json({ success: true, message: 'Message deleted.' });
    }

    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error('API /api/contact error:', error);
    return res.status(500).json({
      error: 'Internal Server Error in contact endpoint',
      message: error.message
    });
  }
}
