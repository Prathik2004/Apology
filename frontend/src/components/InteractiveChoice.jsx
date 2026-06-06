import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function InteractiveChoice() {
  const [accepted, setAccepted] = useState(false)
  const [particles, setParticles] = useState([])

  const handleAccept = () => {
    // Create heart explosion particles
    const newParticles = Array.from({ length: 30 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }))
    setParticles(newParticles)
    setAccepted(true)
  }

  return (
    <section className="relative w-full min-h-screen py-20 px-4 overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl mx-auto"
      >
        {!accepted ? (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-display font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
            >
              If I could ask for one thing...
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-12"
            >
              Would you give me one more chance to prove my love?
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAccept}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-lg"
            >
              Give Me One More Chance ❤️
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <motion.h2
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-5xl md:text-6xl font-display font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
            >
              Thank you! ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-gray-300"
            >
              For reading my heart.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl text-gray-400 mt-4"
            >
              I promise to make this right.
            </motion.p>
          </motion.div>
        )}

        {/* Heart explosion particles */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: particle.x * 100,
              y: particle.y * 100,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 1.5 }}
            className="fixed pointer-events-none text-3xl"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
