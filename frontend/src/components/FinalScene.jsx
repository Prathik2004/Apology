import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const StarsScene = () => {
  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />
      <Stars radius={300} depth={60} count={2000} factor={10} saturation={0} fade speed={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a78bfa" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#f472b6" />
    </>
  )
}

export default function FinalScene() {
  const [showText, setShowText] = useState(false)
  const [showHeart, setShowHeart] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 2000)
    const timer2 = setTimeout(() => setShowHeart(true), 4000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* 3D Stars Background */}
      <Canvas className="absolute inset-0">
        <StarsScene />
      </Canvas>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={showText ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5 }}
        >
          <motion.h1
            className="text-3xl md:text-5xl font-display font-light mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            No matter what happens,
          </motion.h1>

          <motion.h2
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-3xl md:text-5xl font-display font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            I will always cherish every memory with you.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showHeart ? { opacity: 1, scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-8"
          >
            ❤️
          </motion.div>

          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl text-pink-300"
          >
            I love you
          </motion.p>

          {/* Floating hearts background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                  y: Math.random() * window.innerHeight,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -window.innerHeight],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Thank you message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <p className="text-gray-400">Thank you for reading my heart</p>
        </motion.div>
      </div>
    </section>
  )
}
