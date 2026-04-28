import { useEffect, useRef, useState } from "react"
import { GradientTracing } from "@/components/ui/gradient-tracing"

const ORANGE: [string, string, string] = ["#f96406", "#f96406", "#fbbf24"]
const AMBER: [string, string, string]  = ["#fbbf24", "#f96406", "#f96406"]

export function PageBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)

  useEffect(() => {
    const update = () => setW(window.innerWidth)
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  if (!w) return null

  return (
    <div ref={ref} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute" style={{ top: "12%", left: 0 }}>
        <GradientTracing width={w} height={2} baseColor="hsl(24,95%,53%)" gradientColors={ORANGE} animationDuration={4} strokeWidth={1} />
      </div>
      <div className="absolute" style={{ top: "35%", left: 0 }}>
        <GradientTracing width={w} height={2} baseColor="hsl(24,95%,53%)" gradientColors={AMBER} animationDuration={6} strokeWidth={1} />
      </div>
      <div className="absolute" style={{ top: "62%", left: 0 }}>
        <GradientTracing width={w} height={2} baseColor="hsl(24,95%,53%)" gradientColors={ORANGE} animationDuration={5} strokeWidth={1} />
      </div>
      <div className="absolute" style={{ top: "85%", left: 0 }}>
        <GradientTracing width={w} height={2} baseColor="hsl(24,95%,53%)" gradientColors={AMBER} animationDuration={7} strokeWidth={1} />
      </div>
    </div>
  )
}
