import { useEffect, useRef, useState } from "react";

export type TutorCarouselItem = {
  img: string;
  name: string;
  role: string;
  years?: string;
  bio: string;
  tags: string[];
};

type TutorArcCarouselProps = {
  tutors: TutorCarouselItem[];
  onActiveChange?: (tutor: TutorCarouselItem, index: number) => void;
};

/* ── Responsive dimensions ── */
function useDimensions() {
  const [dims, setDims] = useState(() => getDims());

  function getDims() {
    if (typeof window === "undefined") return { cardW: 300, cardH: 400, radius: 340, containerH: 500 };
    const vw = window.innerWidth;
    if (vw < 480) {
      // Phone: smaller cards, tighter radius, taller container relative to card
      const cardW = Math.min(200, vw * 0.5);
      return { cardW, cardH: Math.round(cardW * 1.35), radius: Math.max(180, vw * 0.48), containerH: Math.round(cardW * 1.55) };
    }
    if (vw < 768) {
      const cardW = 240;
      return { cardW, cardH: 320, radius: 280, containerH: 400 };
    }
    return { cardW: 300, cardH: 400, radius: 340, containerH: 500 };
  }

  useEffect(() => {
    const update = () => setDims(getDims());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return dims;
}

const CYCLE_MS = 32000;
const VISIBLE_ARC = 115;

function wrapIndex(value: number, length: number) {
  return ((value % length) + length) % length;
}

function facingAngle(spin: number, index: number, theta: number) {
  const raw = (((-spin + index * theta) % 360) + 360) % 360;
  return Math.min(raw, 360 - raw);
}

export function TutorArcCarousel({ tutors, onActiveChange }: TutorArcCarouselProps) {
  // Duplicate small array (e.g. 2 tutors -> 4 items) for smooth 3D arc presentation
  const displayTutors =
    tutors.length > 0 && tutors.length < 4
      ? tutors.length === 2
        ? [...tutors, ...tutors]
        : [...tutors, ...tutors, ...tutors]
      : tutors;

  const count = displayTutors.length;
  const theta = 360 / count;
  const { cardW, cardH, radius, containerH } = useDimensions();

  const [spin, setSpin] = useState(0);
  const [paused, setPaused] = useState(false);
  const spinRef = useRef(0);
  const rafRef = useRef(0);
  const lastActiveRef = useRef(-1);

  useEffect(() => {
    spinRef.current = spin;
  }, [spin]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const degPerMs = 360 / CYCLE_MS;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;

      if (!paused) {
        setSpin((prev) => {
          const next = (prev + dt * degPerMs) % 360;
          spinRef.current = next;
          return next;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused]);

  useEffect(() => {
    const rawActive = wrapIndex(Math.round(spin / theta), count);
    const active = rawActive % tutors.length;
    if (active === lastActiveRef.current) return;
    lastActiveRef.current = active;
    onActiveChange?.(tutors[active], active);
  }, [spin, theta, count, tutors, onActiveChange]);

  return (
    <div
      className="relative mx-auto w-full max-w-7xl select-none overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative mx-auto w-full"
        style={{ height: containerH, perspective: "1400px", perspectiveOrigin: "50% 46%" }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: `rotateY(${-spin}deg)`,
            willChange: "transform",
          }}
        >
          {displayTutors.map((tutor, i) => {
            const dist = facingAngle(spin, i, theta);
            if (dist > VISIBLE_ARC) return null;

            const t = 1 - dist / VISIBLE_ARC;
            const scale = 0.88 + t * 0.16;
            const opacity = 0.45 + t * 0.55;
            const isCenter = dist < theta * 0.45;

            return (
              <article
                key={`${tutor.name}-${i}`}
                className="absolute"
                style={{
                  width: cardW,
                  height: cardH,
                  left: -cardW / 2,
                  top: -cardH / 2,
                  transform: `rotateY(${i * theta}deg) translateZ(${radius}px) scale(${scale})`,
                  transformStyle: "preserve-3d",
                  opacity,
                  zIndex: Math.round(t * 100),
                  transition: paused ? "opacity 0.3s ease, transform 0.3s ease" : undefined,
                }}
              >
                <div
                  className={`h-full overflow-hidden rounded-2xl sm:rounded-[2rem] bg-card shadow-[var(--shadow-soft)] ring-1 ring-border/40 ${
                    isCenter
                      ? "shadow-[var(--shadow-warm)] ring-2 ring-[color:var(--sun-deep)]/35"
                      : ""
                  }`}
                >
                  <img
                    src={tutor.img}
                    alt={tutor.name}
                    className="h-full w-full object-cover"
                    width={600}
                    height={800}
                    draggable={false}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-28 bg-gradient-to-t from-background via-background/80 to-transparent"
        aria-hidden
      />
    </div>
  );
}
