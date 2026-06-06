import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { audioSrc } from '../data/content'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    const updateProgress = () => {
      if (!audio.duration || Number.isNaN(audio.duration)) return
      setProgress((audio.currentTime / audio.duration) * 100)
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [volume])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 glass p-6 rounded-lg z-40 max-w-sm"
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePlay}
          className="p-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <div className="flex-1">
          <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </motion.div>
  )
}
