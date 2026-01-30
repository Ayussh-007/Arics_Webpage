// Simple serverless function for Vercel
// This creates a proxy to handle API requests

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  )

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // For now, return a simple response indicating the API structure needs updating
  res.status(503).json({
    error: 'API temporarily unavailable',
    message: 'The serverless function structure needs to be updated for Vercel deployment',
    suggestion: 'Please use the standalone server deployment or update the API structure'
  })
}
