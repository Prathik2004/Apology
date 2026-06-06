import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { memories } from '../data/content'
import { fetchFolderResources } from '../utils/cloudinaryAdmin'
import { findCloudinaryResourceUrl } from '../utils/cloudinaryHelpers'

const placeholderImage = '/photos/placeholder.svg'

export default function MemoryTimeline() {
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [memoryState, setMemoryState] = useState(
    memories.map(memory => ({ ...memory, image: placeholderImage }))
  )
  const { ref } = useInView({ threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  useEffect(() => {
    const loadImages = async () => {
      const resources = await fetchFolderResources('Apology/Photos', 'image')
      if (Array.isArray(resources) && resources.length > 0) {
        const lookup = resources.reduce((acc, resource) => {
          const fileName = resource.public_id.split('/').pop()
          acc[fileName] = resource.secure_url
          return acc
        }, {})

        setMemoryState(memories.map(memory => {
          const mappedImage = findCloudinaryResourceUrl(resources, memory.image)
          return {
            ...memory,
            image: mappedImage || memory.image || placeholderImage,
          }
        }))
      }
    }

    loadImages()
  }, [])

  return (
    <section ref={ref} className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-16 right-0 w-72 h-72 bg-gradient-to-l from-purple-500 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Our Beautiful Timeline
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          Every moment that brought us together
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="space-y-10"
        >
          {memoryState.map((memory, index) => (
            <motion.div
              key={memory.id}
              variants={itemVariants}
              className={`flex flex-col gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse md:items-center' : 'md:items-center'} md:flex-row`}
            >
              <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center mx-auto md:mx-0">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                  style={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
                />
                <div className="relative w-8 h-8 bg-slate-900 rounded-full border-2 border-pink-500" />
                {index < memories.length - 1 && (
                  <div className="absolute top-full left-1/2 w-1 h-20 bg-gradient-to-b from-pink-500 to-transparent transform -translate-x-1/2" />
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(236, 72, 153, 0.25)' }}
                onClick={() => setSelectedMemory(memory)}
                className="glass p-6 rounded-3xl cursor-pointer transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <motion.img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full md:w-40 h-52 md:h-40 object-cover rounded-3xl"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-pink-400 mb-2">{memory.date}</p>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold mb-2 text-white">
                      {memory.title}
                    </h3>
                    <p className="text-gray-300 mb-3 text-sm md:text-base">{memory.description}</p>
                    <p className="text-pink-300 italic text-sm">"{memory.quote}"</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedMemory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedMemory(null)}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass p-6 md:p-8 rounded-3xl max-w-2xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <img src={selectedMemory.image} alt={selectedMemory.title} className="w-full h-72 md:h-96 object-cover rounded-3xl mb-6" />
            <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-white">{selectedMemory.title}</h2>
            <p className="text-gray-300 text-base md:text-lg mb-4">{selectedMemory.description}</p>
            <p className="text-pink-400 text-lg italic mb-4">"{selectedMemory.quote}"</p>
            <p className="text-gray-400 text-sm">{selectedMemory.date}</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
