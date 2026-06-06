import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const backendEnvPath = path.resolve(__dirname, '.env')
dotenv.config({ path: backendEnvPath })

const frontendEnvPath = path.resolve(__dirname, '../frontend/.env')
if (!process.env.CLOUDINARY_CLOUD_NAME && !process.env.VITE_CLOUDINARY_CLOUD_NAME) {
  const result = dotenv.config({ path: frontendEnvPath })
  if (!result.error) {
    console.log('Loaded Cloudinary credentials from frontend/.env fallback')
  }
}

const app = express()
const port = process.env.PORT || 5000

const backendUrl = process.env.BACKEND_URL || process.env.VITE_BACKEND_URL
const frontendUrl = process.env.FRONTEND_URL || process.env.VITE_FRONTEND_URL

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.VITE_CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY || process.env.VITE_CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET || process.env.VITE_CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('WARNING: Cloudinary credentials are not fully configured in backend/.env')
}

const corsOptions = frontendUrl ? { origin: frontendUrl } : {}
app.use(cors(corsOptions))
app.use(express.json())

app.get('/api/cloudinary/resources', async (req, res) => {
  const folder = req.query.folder
  const resourceType = req.query.resourceType || 'image'

  if (!folder) {
    return res.status(400).json({ error: 'Missing folder query parameter' })
  }

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary credentials not configured' })
  }

  const cleanFolder = folder.replace(/^\/+|\/+$/g, '')
  const expression = `asset_folder:${cleanFolder}`
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/search?expression=${encodeURIComponent(expression)}&resource_type=${resourceType}&max_results=500`
  const token = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      return res.status(response.status).json({ error: text || 'Cloudinary API error' })
    }

    const data = await response.json()
    const resources = Array.isArray(data.resources) ? data.resources : []
    resources.sort((a, b) => (a.public_id || '').localeCompare(b.public_id || ''))

    return res.json({ resources })
  } catch (error) {
    console.error('Cloudinary fetch error', error)
    return res.status(500).json({ error: 'Failed to fetch Cloudinary resources' })
  }
})

app.get('/', (req, res) => {
  res.send('Apology Website Backend is running')
})

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
  if (backendUrl) console.log(`Configured BACKEND_URL=${backendUrl}`)
  if (frontendUrl) console.log(`Configured FRONTEND_URL=${frontendUrl}`)
})
