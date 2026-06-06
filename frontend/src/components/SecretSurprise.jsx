import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function SecretSurprise() {
  const [clicks, setClicks] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const handleHeartClick = () => {
    setClicks(prev => {
      const newCount = prev + 1
      if (newCount >= 10) {
        setRevealed(true)
      }
      return newCount
    })
  }

  return (
    <section className="relative w-full min-h-screen py-20 px-4 overflow-hidden flex items-center justify-center">
      {!revealed ? (
        <motion.div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-500 text-sm mb-8"
          >
            (Hint: click on the hearts to unlock something special)
          </motion.p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[...Array(10)].map((_, i) => (
              <motion.button
                key={i}
                onClick={handleHeartClick}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: clicks > i ? [1, 1.2, 1] : 1,
                }}
                className="text-6xl cursor-pointer"
              >
                {clicks > i ? '❤️' : '🤍'}
              </motion.button>
            ))}
          </div>
          <p className="mt-8 text-gray-400">{clicks}/10 clicks</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring' }}
          className="text-center max-w-2xl"
        >
          <motion.h2
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-5xl font-display mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            🎁 Our Secret World 🎁
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-lg space-y-6"
          >
            <p className="text-2xl text-pink-300">
              In a world where everything is uncertain, one thing will always be certain:
            </p>
            
            <motion.p
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
            >
              My love for you.
            </motion.p>

            <p className="text-lg text-gray-300">
              You are my forever. You are my home. You are everything I'll never stop fighting for.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-5xl"
            >
              💕
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
