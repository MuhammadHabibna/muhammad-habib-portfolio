"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const greetings = [
  { text: "Assalamualaikum", color: "#22c55e" },   // Islamic / Arab
  { text: "Halo", color: "#6366f1" },               // Indonesia
  { text: "Hello", color: "#3b82f6" },              // English
  { text: "Bonjour", color: "#ec4899" },            // French
  { text: "Ciao", color: "#22c55e" },               // Italian
  { text: "Hola", color: "#f97316" },               // Spanish
  { text: "안녕하세요", color: "#f59e0b" },          // Korean
  { text: "你好", color: "#ef4444" },               // Chinese
  { text: "こんにちは", color: "#8b5cf6" },          // Japanese
  { text: "Привет", color: "#06b6d4" },             // Russian
  { text: "Namaste", color: "#d97706" },            // Hindi / India
  { text: "مرحبا", color: "#10b981" },              // Arabic
]

const DISPLAY_DURATION = 170 // ms per greeting

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)

  const handleComplete = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onComplete()
    }, 700)
  }, [onComplete])

  useEffect(() => {
    if (currentIndex < greetings.length) {
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, DISPLAY_DURATION)
      return () => clearTimeout(timer)
    } else {
      handleComplete()
    }
  }, [currentIndex, handleComplete])

  const current = greetings[Math.min(currentIndex, greetings.length - 1)]

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f4f4f6] dark:bg-[#0a0a0f]"
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      {/* Subtle grid background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <AnimatePresence mode="wait">
        {!isExiting && currentIndex < greetings.length && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            className="flex items-end select-none"
          >
            <span
              className="font-extrabold leading-none tracking-tight"
              style={{
                color: current.color,
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                fontFamily: "'Inter', system-ui, sans-serif",
                textShadow: `0 0 80px ${current.color}40`,
              }}
            >
              {current.text}
            </span>
            <motion.span
              className="font-extrabold leading-none"
              style={{
                color: current.color,
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                opacity: 0.6,
                marginLeft: "0.1em",
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            >
              .
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] rounded-full"
        style={{ backgroundColor: current?.color ?? "#6366f1" }}
        initial={{ width: "0%" }}
        animate={{ width: `${((currentIndex + 1) / greetings.length) * 100}%` }}
        transition={{ duration: DISPLAY_DURATION / 1000, ease: "linear" }}
      />
    </motion.div>
  )
}
