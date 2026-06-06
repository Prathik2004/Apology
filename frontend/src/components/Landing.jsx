import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const LandingScene = () => {
  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      <Stars radius={300} depth={60} count={1000} factor={10} saturation={0} fade speed={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#a78bfa" />
      <pointLight position={[10, 10, 10]} intensity={0.2} color="#f472b6" />
    </>
  )
}

const GlowingHeart = ({ position = [0, 0, 0] }) => {
  const heartRef = useRef()

  useEffect(() => {
    if (!heartRef.current) return

    const shape = new THREE.Shape()
    const x = 0
    const y = 0
    const size = 2

    shape.moveTo(x + 0, y + size * 0.5)
    shape.bezierCurveTo(
      x + 0, y + size * 0.5,
      x - size * 0.5, y + 0,
      x - size * 0.5, y - size * 0.3
    )
    shape.bezierCurveTo(
      x - size * 0.5, y - size * 0.8,
      x + 0, y - size,
      x + size * 0.5, y - size * 0.3
    )
    shape.bezierCurveTo(
      x + size * 0.5, y + 0,
      x + 0, y + size * 0.5,
      x + 0, y + size * 0.5
    )

    const geometry = new THREE.ShapeGeometry(shape)
    const material = new THREE.MeshPhongMaterial({
      color: 0xec4899,
      emissive: 0xf472b6,
      emissiveIntensity: 1.5,
    })

    const mesh = new THREE.Mesh(geometry, material)
    heartRef.current.add(mesh)
  }, [])

  return (
    <group ref={heartRef} position={position}>
      <pointLight intensity={2} color="#f472b6" distance={20} />
    </group>
  )
}

export default function Landing({ onContinue }) {
  const containerRef = useRef(null)
  const [showText, setShowText] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 1000)
    const timer2 = setTimeout(() => setShowButton(true), 4000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* 3D Scene Background */}
      <Canvas className="absolute inset-0">
        <LandingScene />
        <GlowingHeart position={[0, 0, 0]} />
      </Canvas>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={showText ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, type: 'spring' }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={showText ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-4xl md:text-6xl font-display font-light mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
          >
            Hey Love...
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showText ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-6 font-light"
          >
            I know I hurt you.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showText ? { opacity: 1 } : {}}
            transition={{ delay: 2.5, duration: 1.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8"
          >
            But before you decide anything...
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={showText ? { opacity: 1 } : {}}
            transition={{ delay: 3.5, duration: 1.2 }}
            className="text-lg text-gray-400 mb-12"
          >
            Can I show you something?
          </motion.div>
        </motion.div>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={showButton ? { opacity: 1, y: 0 } : {}}
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.8)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onContinue}
          className="mt-16 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-lg"
        >
          Yes ❤️
        </motion.button>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: -100,
              opacity: [0.6, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
