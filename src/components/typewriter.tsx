import { useEffect, useState } from "react";

export function Typewriter({
  words,
  className = "",
  typingMs = 85,
  pauseMs = 1500,
  deletingMs = 45,
}: {
  words: string[];
  className?: string;
  typingMs?: number;
  pauseMs?: number;
  deletingMs?: number;
}) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    if (!deleting && sub === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && sub === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setSub((s) =>
          deleting ? current.slice(0, s.length - 1) : current.slice(0, s.length + 1),
        );
      },
      deleting ? deletingMs : typingMs,
    );
    return () => clearTimeout(t);
  }, [sub, deleting, idx, words, typingMs, deletingMs, pauseMs]);

  return (
    <span className={className}>
      {sub}
      <span className="kk-caret" aria-hidden style={{ height: "0.9em" }} />
    </span>
  );
}