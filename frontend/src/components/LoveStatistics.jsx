import React from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { stats } from '../data/content'

const Counter = ({ target }) => {
  const spring = useSpring({ number: target, from: { number: 0 }, config: { duration: 2000 } })

  return (
    <animated.span>
      {spring.number.to((n) => Math.floor(n).toLocaleString())}
    </animated.span>
  )
}

export default function LoveStatistics() {
  const statCards = [
    { label: 'Days Together', value: stats.daysTogether, emoji: '❤️' },
    { label: 'Memories Created', value: stats.memoriesCreated, emoji: '📸' },
    { label: 'Hours on Calls', value: stats.hoursOnCalls, emoji: '📞' },
    { label: 'Messages Sent', value: stats.messagesSent, emoji: '💬' },
    { label: 'Times We Laughed', value: stats.timesWeLaughed, emoji: '😂' },
  ]

  return (
    <section className="relative w-full min-h-screen py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-24 left-1/4 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-display font-light mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
        >
          Our Love in Numbers
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-300 mb-12 text-base md:text-lg"
        >
          A glimpse into our beautiful journey together
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-3xl text-center cursor-pointer"
            >
              <div className="text-4xl md:text-5xl mb-4">{stat.emoji}</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.08 }}
                className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2"
              >
                <Counter target={stat.value} />
              </motion.div>
              <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
