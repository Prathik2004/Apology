import React from 'react'
import { motion } from 'framer-motion'
import { promises } from '../data/content'

export default function FuturePromises() {
  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-b from-pink-500 to-transparent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
        >
          My Promises to You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          Commitments for our beautiful future together
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(236, 72, 153, 0.2)',
              }}
              className="glass p-6 rounded-3xl relative overflow-hidden group"
            >
              <motion.div
                animate={{
                  top: ['0%', '-100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -top-1/2 left-1/2 w-20 h-20 bg-gradient-to-b from-pink-500 to-transparent rounded-full blur-2xl opacity-50 transform -translate-x-1/2 pointer-events-none"
              />

              <div className="relative z-10 flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-2xl mt-1"
                >
                  💖
                </motion.div>
                <p className="text-base md:text-lg text-gray-100 leading-relaxed">{promise}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
