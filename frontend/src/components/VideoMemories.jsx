import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { videos } from '../data/content'
import { openCloudinaryWidget } from '../utils/cloudinary'
import { fetchFolderResources } from '../utils/cloudinaryAdmin'
import { assignVideoPosters } from '../utils/cloudinaryHelpers'

const placeholderImage = '/photos/placeholder.svg'

export default function VideoMemories() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [videoError, setVideoError] = useState(false)
  const [videosState, setVideosState] = useState(
    videos.map(video => ({ ...video, poster: placeholderImage, src: '' }))
  )

  useEffect(() => {
    const load = async () => {
      const resources = await fetchFolderResources('Apology/Videos', 'video')
      const photoResources = await fetchFolderResources('Apology/Photos', 'image')

      if (Array.isArray(resources) && resources.length > 0) {
        const posters = assignVideoPosters(Array.isArray(photoResources) ? photoResources : [], resources.length, placeholderImage)
        const mapped = resources.map((r, index) => ({
          id: r.public_id,
          title: r.original_filename || r.public_id,
          src: r.secure_url,
          poster: posters[index],
        }))
        setVideosState(mapped)
      } else {
        setVideosState(videos.map(video => ({ ...video, poster: placeholderImage, src: '' })))
      }
    }

    load()
  }, [])

  const handleUploadVideo = () => {
    openCloudinaryWidget({ resourceType: 'video', multiple: false }, info => {
      const newVideo = {
        id: info.asset_id || Date.now(),
        title: info.original_filename || 'Uploaded video',
        src: info.secure_url,
        poster: info.thumbnail_url || ''
      }
      setVideosState(prev => [newVideo, ...prev])
    })
  }

  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
        >
          Video Memories
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          Moving moments we captured together
        </motion.p>

        <div className="flex items-center justify-end mb-6">
          <button onClick={handleUploadVideo} className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-semibold">Upload Video</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videosState.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative group cursor-pointer"
              onClick={() => {
                if (!video.src) return
                setVideoError(false)
                setSelectedVideo(video)
              }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden rounded-3xl"
              >
                  <img
                  src={video.poster}
                  alt={video.title}
                  className="w-full h-64 object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center"
                  >
                    <div className="w-0 h-0 border-l-8 border-t-5 border-b-5 border-l-white border-t-transparent border-b-transparent ml-1" />
                  </motion.div>
                </motion.div>
              </motion.div>
              <h3 className="text-xl font-semibold mt-4 text-white">{video.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl mx-auto max-h-[90vh] overflow-auto px-2"
            onClick={e => e.stopPropagation()}
          >
            {videoError ? (
              <div className="bg-slate-900 p-6 rounded-3xl text-center text-gray-200">
                <p className="mb-4">Unable to play this video (file missing or unsupported).</p>
                <a href={selectedVideo.src} download className="inline-block px-4 py-2 bg-pink-500 text-white rounded-full">Download video</a>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center px-2">
                <video
                  controls
                  autoPlay
                  className="rounded-3xl object-contain w-full h-auto max-w-[92vw] sm:max-w-[720px] md:max-w-[960px] max-h-[60vh] sm:max-h-[70vh] md:max-h-[80vh]"
                  poster={selectedVideo.poster}
                  onError={() => setVideoError(true)}
                >
                  <source src={selectedVideo.src} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
            )}
            <button
              onClick={() => setSelectedVideo(null)}
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
