"use client"

import { useState } from "react"
import { IntroAnimation } from "./IntroAnimation"

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)

  const handleComplete = () => {
    window.scrollTo({ top: 0, behavior: "instant" })
    setIntroComplete(true)
  }

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={handleComplete} />
      )}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
          visibility: introComplete ? "visible" : "hidden",
        }}
      >
        {children}
      </div>
    </>
  )
}

