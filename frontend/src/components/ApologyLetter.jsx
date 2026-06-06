import React from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { apologyLetter } from '../data/content'

export default function ApologyLetter() {
  return (
    <div id="letter-section" className="relative w-full min-h-screen flex items-center justify-center py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, rotateX: 20 }}
        whileInView={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-3xl"
      >
        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
            className="absolute inset-0 bg-gradient-to-b from-amber-50 to-amber-100 rounded-3xl shadow-2xl"
            style={{ originX: 0.5 }}
          />

          <div className="relative px-6 md:px-12 py-10 md:py-16 bg-gradient-to-b from-amber-50 to-amber-100 rounded-3xl shadow-2xl backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="font-body text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line"
            >
              <TypeAnimation
                sequence={[apologyLetter]}
                speed={30}
                cursor={true}
                className="block"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-8 pl-4 md:pl-8"
        >
          <p className="text-2xl md:text-3xl font-display text-pink-500 italic">Forever yours,</p>
          <p className="text-lg md:text-xl text-gray-600 mt-2">With all my love ❤️</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
