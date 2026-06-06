import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { whyILoveYou } from '../data/content'

export default function WhyILoveYou() {
  const [flipped, setFlipped] = useState({})

  const toggleFlip = (index) => {
    setFlipped(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-l from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
        >
          Why I Love You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          Let me count the ways...
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyILoveYou.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => toggleFlip(index)}
              className="relative w-full h-64 cursor-pointer perspective"
              style={{ perspective: '1000px' }}
            >
              <motion.div
                animate={{ rotateY: flipped[index] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <motion.div
                  className="absolute inset-0 glass p-6 rounded-3xl flex flex-col items-center justify-center text-center"
                  style={{ backfaceVisibility: 'hidden' }}
                  whileHover={{ boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)' }}
                >
                  <div className="text-4xl mb-4">{reason.emoji}</div>
                  <p className="text-white font-semibold text-sm md:text-base">{reason.text}</p>
                </motion.div>

                <div
                  className="absolute inset-0 glass p-6 rounded-3xl flex items-center justify-center text-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="text-pink-300 font-semibold text-base">
                    This is why you're my everything
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
