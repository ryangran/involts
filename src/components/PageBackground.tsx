import { useEffect, useRef, useState } from "react"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { GradientTracing } from "@/components/ui/gradient-tracing"

const ORANGE: [string, string, string] = ["#f96406", "#f96406", "#fbbf24"]
const AMBER: [string, string, string]  = ["#fbbf24", "#f96406", "#f96406"]

export function PageBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)
  const [h, setH] = useState(0)

  useEffect(() => {
    const update = () => {
      setW(window.innerWidth)
      setH(window.innerHeight)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  if (!w || !h) return null

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Flickering dot grid */}
      <FlickeringGrid
        color="rgb(249, 100, 6)"
        maxOpacity={0.05}
        flickerChance={0.07}
        squareSize={3}
        gridGap={7}
        className="absolute inset-0 w-full h-full"
      />

      {/* Horizontal trace lines at different heights */}
      <div className="absolute inset-0">
        {/* top area */}
        <div className="absolute" style={{ top: "12%", left: 0 }}>
          <GradientTracing
            width={w}
            height={2}
            baseColor="hsl(24,95%,53%)"
            gradientColors={ORANGE}
            animationDuration={4}
            strokeWidth={1}
          />
        </div>

        {/* upper-mid */}
        <div className="absolute" style={{ top: "35%", left: 0 }}>
          <GradientTracing
            width={w}
            height={2}
            baseColor="hsl(24,95%,53%)"
            gradientColors={AMBER}
            animationDuration={6}
            strokeWidth={1}
          />
        </div>

        {/* lower-mid */}
        <div className="absolute" style={{ top: "62%", left: 0 }}>
          <GradientTracing
            width={w}
            height={2}
            baseColor="hsl(24,95%,53%)"
            gradientColors={ORANGE}
            animationDuration={5}
            strokeWidth={1}
          />
        </div>

        {/* bottom area */}
        <div className="absolute" style={{ top: "85%", left: 0 }}>
          <GradientTracing
            width={w}
            height={2}
            baseColor="hsl(24,95%,53%)"
            gradientColors={AMBER}
            animationDuration={7}
            strokeWidth={1}
          />
        </div>
      </div>

      {/* Edge fades so content stays readable */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
