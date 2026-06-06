import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { TextureLoader } from 'three'
import { memories } from '../data/content'
import { fetchFolderResources } from '../utils/cloudinaryAdmin'
import { findCloudinaryResourceUrl } from '../utils/cloudinaryHelpers'

const placeholderImage = '/photos/placeholder.svg'

const MemoryPlanet = ({ position, image, onClick }) => {
  const texture = useLoader(TextureLoader, image || placeholderImage)

  return (
    <group position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshPhongMaterial
          map={texture}
          emissive={0xff69b4}
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight intensity={2} color="#f472b6" distance={15} />
    </group>
  )
}

const MemoryGalaxyScene = ({ memories, onSelect }) => {
  const orbitRadius = 8

  return (
    <>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate
        autoRotateSpeed={0.3}
      />

      <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f472b6" />
      <ambientLight intensity={0.4} />

      {memories.map((memory, index) => {
        const angle = (index / memories.length) * Math.PI * 2
        const x = Math.cos(angle) * orbitRadius
        const z = Math.sin(angle) * orbitRadius

        return (
          <MemoryPlanet
            key={memory.id}
            position={[x, (index - memories.length / 2) * 1.5, z]}
            image={memory.image}
            onClick={() => onSelect(memory)}
          />
        )
      })}

      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhongMaterial emissive={0xffb6d9} emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#ffb6d9" distance={20} />
    </>
  )
}

export default function MemoryGalaxy() {
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [memoryState, setMemoryState] = useState(
    memories.map(memory => ({ ...memory, image: placeholderImage }))
  )

  useEffect(() => {
    const loadImages = async () => {
      const resources = await fetchFolderResources('Apology/Photos', 'image')
      if (Array.isArray(resources) && resources.length > 0) {
        const lookup = resources.reduce((acc, resource) => {
          const fileName = resource.public_id.split('/').pop()
          acc[fileName] = resource.secure_url
          return acc
        }, {})

        setMemoryState(
          memories.map(memory => {
            const mappedImage = findCloudinaryResourceUrl(resources, memory.image)
            return {
              ...memory,
              image: mappedImage || memory.image || placeholderImage,
            }
          })
        )
      }
    }

    loadImages()
  }, [])

  return (
    <section className="relative w-full min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
        >
          Our Memory Galaxy
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          Click on any memory to explore its story
        </motion.p>
      </div>

      <div className="w-full h-[70vh] md:h-[40vh] rounded-3xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
          <MemoryGalaxyScene memories={memoryState} onSelect={setSelectedMemory} />
        </Canvas>
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
            className="glass p-6 rounded-3xl max-w-2xl w-full"
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
