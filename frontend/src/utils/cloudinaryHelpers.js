export function normalizeFileKey(value) {
  if (!value) return ''
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\.[^/.]+$/, '')
}

function stripRandomSuffix(key) {
  return key.replace(/_[a-z0-9]{4,}$/i, '')
}

export function buildCloudinaryLookup(resources) {
  const lookup = new Map()

  resources.forEach(resource => {
    const publicId = resource.public_id?.split('/').pop() || ''
    const filename = resource.filename || ''
    const displayName = resource.display_name || ''
    const candidates = [publicId, filename, displayName]

    candidates.forEach(candidate => {
      const normalized = normalizeFileKey(candidate)
      if (normalized) {
        lookup.set(normalized, resource.secure_url)
        const stripped = normalizeFileKey(stripRandomSuffix(normalized))
        if (stripped) {
          lookup.set(stripped, resource.secure_url)
        }
      }
    })
  })

  return lookup
}

export function findCloudinaryResourceUrl(resources, imagePath) {
  const lookup = buildCloudinaryLookup(resources)
  const baseName = normalizeFileKey(imagePath?.split('/').pop())
  if (!baseName) return null

  if (lookup.has(baseName)) return lookup.get(baseName)

  for (const [key, url] of lookup.entries()) {
    if (key === baseName) return url
    if (key.startsWith(baseName + '_')) return url
    if (baseName.startsWith(key + '_')) return url
    if (key.includes(baseName) || baseName.includes(key)) return url
  }

  return null
}

export function assignVideoPosters(photoResources, count, fallback) {
  const posters = photoResources
    .map(r => r.secure_url)
    .filter(Boolean)

  if (!posters.length) {
    return Array(count).fill(fallback)
  }

  return Array.from({ length: count }, (_, index) => posters[index % posters.length])
}
