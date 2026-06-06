// Simple Cloudinary Upload Widget helper
export function openCloudinaryWidget(options = {}, onUpload) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

  if (!cloudName || !uploadPreset) {
    console.warn('Cloudinary env vars missing: VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET')
    return
  }

  function loadScript() {
    return new Promise((resolve, reject) => {
      if (window.cloudinary) return resolve()
      const s = document.createElement('script')
      s.src = 'https://widget.cloudinary.com/v2.0/global/all.js'
      s.onload = () => resolve()
      s.onerror = reject
      document.head.appendChild(s)
    })
  }

  loadScript().then(() => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,
        sources: options.sources || ['local', 'camera', 'url'],
        multiple: options.multiple || false,
        resourceType: options.resourceType || 'image',
        clientAllowedFormats: options.clientAllowedFormats,
        maxFileSize: options.maxFileSize,
        cropping: options.cropping || false,
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Widget error', error)
          return
        }
        if (result && result.event === 'success') {
          onUpload && onUpload(result.info)
        }
      }
    )

    widget.open()
  }).catch(err => {
    console.error('Failed to load Cloudinary widget', err)
  })
}
