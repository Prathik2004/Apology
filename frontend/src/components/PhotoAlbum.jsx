import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { photos } from '../data/content'
import { openCloudinaryWidget } from '../utils/cloudinary'
import { fetchFolderResources } from '../utils/cloudinaryAdmin'

const placeholderImage = '/photos/placeholder.svg'

export default function PhotoAlbum() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [photosState, setPhotosState] = useState(
    photos.map(photo => ({ ...photo, url: placeholderImage }))
  )

  useEffect(() => {
    const load = async () => {
      const resources = await fetchFolderResources('Apology/Photos', 'image')
      if (Array.isArray(resources) && resources.length > 0) {
        const mapped = resources.map(r => ({ id: r.public_id, url: r.secure_url }))
        setPhotosState(mapped)
      } else {
        setPhotosState(photos.map(photo => ({ ...photo, url: placeholderImage })))
      }
    }

    load()
  }, [])

  const handleUpload = () => {
    openCloudinaryWidget({ resourceType: 'image', multiple: true }, info => {
      const newPhoto = { id: info.asset_id || Date.now(), url: info.secure_url }
      setPhotosState(prev => [newPhoto, ...prev])
    })
  }

  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Photo Gallery
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          A visual love story
        </motion.p>

        <div className="flex items-center justify-end mb-6">
          <button onClick={handleUpload} className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-semibold">Upload</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
          {photosState.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative overflow-hidden rounded-3xl cursor-pointer group h-64 sm:h-72"
            >
                <motion.img
                src={photo.url}
                alt="Memory"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end justify-center pb-4"
              >
                <button className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-semibold">
                  View
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedPhoto && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-3xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img src={selectedPhoto.url} alt="Full view" className="w-full h-auto rounded-3xl" />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold hover:bg-gray-300"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
