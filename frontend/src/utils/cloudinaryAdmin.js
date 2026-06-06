// Cloudinary Admin API helper (uses API key + secret)
// WARNING: Embedding API secret in client-side code is insecure.
// The user requested direct client usage; ensure you understand the risk.

export async function fetchFolderResources(folderPath, resourceType = 'image') {
  const apiUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || ''
  const url = `${apiUrl}/api/cloudinary/resources?folder=${encodeURIComponent(folderPath)}&resourceType=${encodeURIComponent(resourceType)}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      console.error('Backend Cloudinary fetch error', res.status, text)
      return null
    }

    const data = await res.json()
    if (!data.resources) return []
    return data.resources
  } catch (err) {
    console.error('Failed to fetch Cloudinary resources from backend', err)
    return null
  }
}
