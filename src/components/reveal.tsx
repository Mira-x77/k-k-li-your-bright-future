import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type Anim = "up" | "left" | "right" | "zoom";

export function Reveal({
  children,
  as: Tag = "div",
  anim = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  anim?: Anim;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      "data-anim": anim,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`,
      style: delay ? { animationDelay: `${delay}ms` } : undefined,
    },
    children,
  );
}