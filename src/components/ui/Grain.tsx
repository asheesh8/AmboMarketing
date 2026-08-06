/**
 * Fixed film-grain overlay. Pure SVG turbulence — no image request, no JS.
 * Kept at very low opacity: it should read as texture on the dark ground,
 * never as visible noise.
 */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
    >
      <svg className="h-full w-full">
        <filter id="ambo-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambo-grain)" />
      </svg>
    </div>
  );
}
