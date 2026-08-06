"use client";

import { useMotionOK } from "@/lib/motion";

/**
 * One copy of the marquee contents. Declared at module scope — defining it
 * inside Marquee would create a new component type on every render and
 * remount the whole list.
 */
function MarqueeGroup({
  items,
  hidden,
}: {
  items: readonly string[];
  hidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
      aria-hidden={hidden}
    >
      {items.map((item) => (
        <li key={item} className="flex shrink-0 items-center gap-10 md:gap-16">
          <span className="whitespace-nowrap font-display text-2xl md:text-4xl">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite marquee. The track holds two identical copies of the content and
 * translates by exactly -50%, so the seam is never visible. The second copy
 * is aria-hidden so assistive tech reads the list once.
 *
 * CSS animation rather than JS — it runs on the compositor and costs nothing.
 * Under reduced motion the track stops and the container simply scrolls,
 * so no content becomes unreachable.
 */
export default function Marquee({
  items,
  speed = 42,
  className = "",
}: {
  items: readonly string[];
  speed?: number;
  className?: string;
}) {
  const motionOK = useMotionOK();

  return (
    <div
      className={`ambo-marquee relative flex overflow-x-auto overflow-y-hidden ${className}`}
      style={{ scrollbarWidth: "none" }}
    >
      <div
        className="ambo-marquee__track flex w-max"
        style={
          motionOK
            ? { animation: `ambo-marquee-scroll ${speed}s linear infinite` }
            : undefined
        }
      >
        <MarqueeGroup items={items} />
        <MarqueeGroup items={items} hidden />
      </div>

      <style>{`
        @keyframes ambo-marquee-scroll {
          to { transform: translate3d(-50%, 0, 0); }
        }
        .ambo-marquee:hover .ambo-marquee__track {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
