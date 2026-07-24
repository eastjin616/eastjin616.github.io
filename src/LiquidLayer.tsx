import { Component, useEffect, useState, type ErrorInfo, type ReactNode } from 'react'
import { Frame, Glass, GlassContainer, LiquidCanvas } from '@liquid-dom/react'

class LiquidErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('Liquid layer disabled:', error.message, info.componentStack)
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function LiquidLayer() {
  const [failed, setFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  if (failed || !('gpu' in navigator)) {
    return null
  }

  return (
    <LiquidErrorBoundary>
      <div className="liquid-layer-host" aria-hidden="true">
        <LiquidCanvas
          className="liquid-layer"
          canvasClassName="liquid-layer__canvas"
          frameloop={reducedMotion ? 'demand' : 'always'}
          maxDpr={1.5}
          onError={() => setFailed(true)}
        >
          <GlassContainer
            blur={6}
            spacing={24}
            bezelWidth={14}
            thickness={64}
            tint={{ r: 0.45, g: 0.55, b: 0.62, a: 0.32 }}
          >
            <Glass cornerRadius={80}>
              <Frame width={160} height={160} />
            </Glass>
          </GlassContainer>
        </LiquidCanvas>
      </div>
    </LiquidErrorBoundary>
  )
}
