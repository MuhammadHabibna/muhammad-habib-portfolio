"use client"

import { useState } from "react"
import { IntroAnimation } from "./IntroAnimation"

export function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && (
        <IntroAnimation onComplete={() => setIntroComplete(true)} />
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
