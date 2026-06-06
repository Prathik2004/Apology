import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Landing from './components/Landing'
import ApologyLetter from './components/ApologyLetter'
import MemoryTimeline from './components/MemoryTimeline'
import MemoryGalaxy from './components/MemoryGalaxy'
import LoveStatistics from './components/LoveStatistics'
import WhyILoveYou from './components/WhyILoveYou'
import PhotoAlbum from './components/PhotoAlbum'
import VideoMemories from './components/VideoMemories'
import FuturePromises from './components/FuturePromises'
import InteractiveChoice from './components/InteractiveChoice'
import SecretSurprise from './components/SecretSurprise'
import FinalScene from './components/FinalScene'
import MusicPlayer from './components/MusicPlayer'
import './styles/index.css'

function App() {
  const [lenis, setLenis] = useState(null)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    setLenis(lenis)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Landing onContinue={() => {
          if (lenis) {
            lenis.scrollTo(document.getElementById('letter-section'))
          }
        }} />
        <ApologyLetter />
        <MemoryTimeline />
        <MemoryGalaxy />
        <LoveStatistics />
        <WhyILoveYou />
        <PhotoAlbum />
        <VideoMemories />
        <FuturePromises />
        <InteractiveChoice />
        <SecretSurprise />
        <FinalScene />
        <MusicPlayer />
      </motion.div>
    </div>
  )
}

export default App
