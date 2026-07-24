---
module: portfolio-hero-lens
date: 2026-07-25
problem_type: ui_bug
component: frontend_stimulus
severity: medium
symptoms:
  - "The @liquid-dom/react hero lens rendered as an opaque black square."
  - "The WebGPU canvas clear surface obscured the intended circular lens effect."
root_cause: config_error
resolution_type: code_fix
category: ui-bugs
tags:
  - liquid-dom
  - webgpu
  - canvas
  - css-clipping
  - screen-blending
---

# Liquid-dom WebGPU canvas appeared as a black square

## Problem

The decorative `@liquid-dom/react` hero lens rendered its rectangular WebGPU
surface as an opaque black area. That surface conflicted with the portfolio's
circular wafer motif and made the optional effect look like a broken block.

## Symptoms

- The full 160 × 160 lens area appeared as a black square.
- The canvas boundary was more visible than the intended circular refraction.
- A WebGPU initialization or rendering failure could have damaged the hero
  composition if the effect owned any essential content.

## What Didn't Work

Placing `LiquidCanvas` above the wafer as an ordinary layer was insufficient.
The canvas clear surface did not composite transparently, so the rectangular
area remained visible regardless of the effect's `cornerRadius`.

Moving essential content into liquid-dom or removing the CSS lens was also
rejected. Either approach would make the portfolio depend on WebGPU support and
successful runtime initialization.

## Solution

Clip the host to the same circular boundary as the lens and use screen blending
so the dark clear surface does not cover the underlying design.

```css
.liquid-layer-host {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  mix-blend-mode: screen;
  pointer-events: none;
}
```

Keep the CSS lens as a sibling fallback and mount the WebGPU effect only as a
decorative enhancement.

```tsx
<span className="wafer__lens" />
<HeroLiquid />
```

Contain unsupported environments and runtime failures inside the enhancement.

```tsx
if (failed || !('gpu' in navigator)) return null

<LiquidErrorBoundary>
  <LiquidCanvas onError={() => setFailed(true)}>
    {/* decorative glass */}
  </LiquidCanvas>
</LiquidErrorBoundary>
```

## Why This Works

`border-radius` with `overflow: hidden` clips the rectangular WebGPU canvas to
the circular lens. `mix-blend-mode: screen` prevents black pixels from
darkening the background while preserving the brighter refraction.

If WebGPU is absent or the liquid layer fails, the component returns no canvas.
The sibling `.wafer__lens` and all semantic HTML remain available, so the
portfolio's content and navigation do not depend on the visual effect.

## Prevention

- Keep liquid-dom decorative; never put text or navigation inside its canvas.
- Preserve `border-radius`, `overflow: hidden`, and `mix-blend-mode: screen`
  together when changing the host.
- Verify an active WebGPU screenshot has no dark canvas corners.
- Verify the CSS lens and essential content remain when WebGPU is unavailable or
  `LiquidCanvas` reports an error.
- Treat commit `eee2517`, `src/LiquidLayer.tsx`, and `src/styles.css` as the
  implementation source of truth.

## Related Issues

- [Portfolio implementation plan](../../../outputs/2026-07-24-portfolio-website-implementation-plan.md)
- [Portfolio design direction](../../../outputs/2026-07-23-portfolio-website-design.md)
