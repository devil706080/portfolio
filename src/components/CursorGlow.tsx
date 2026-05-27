import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 mix-blend-screen blur-3xl transition-transform duration-200 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        background:
          "radial-gradient(circle, oklch(0.85 0.18 200 / 60%), oklch(0.65 0.27 295 / 30%) 40%, transparent 70%)",
      }}
    />
  );
}
