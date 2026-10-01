import { useEffect, useLayoutEffect, useState } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

let playedThisSession: boolean | null = null;
const LEAVE_AT = 3900;
const DONE_AT = 4900;

export function Intro() {
  const [phase, setPhase] = useState<"play" | "leave" | "done">("play");

  useIsoLayoutEffect(() => {
    const skip =
      playedThisSession ||
      (typeof window !== "undefined" && sessionStorage.getItem("rs-intro-played")) ||
      (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (skip) {
      setPhase("done");
      return;
    }
    playedThisSession = true;
    sessionStorage.setItem("rs-intro-played", "1");
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("leave"), LEAVE_AT);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, DONE_AT);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex flex-col bg-ink text-cream overflow-hidden ${
        phase === "leave" ? "intro-leave" : "intro-enter"
      }`}
    >
      {/* spinning star, top right */}
      <span className="intro-star absolute top-8 right-8 text-lime text-5xl md:text-7xl select-none">✺</span>
      <span className="absolute bottom-24 left-10 text-pink text-3xl select-none opacity-80">✺</span>
      <span className="absolute top-1/3 left-[12%] text-sun text-xl select-none opacity-70">✺</span>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <p className="intro-pill mb-8 rounded-full border-2 border-cream/40 px-4 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-lime">
          made in india, obviously
        </p>
        <h1 className="leading-[0.9]">
          <span className="block overflow-hidden pb-1">
            <span className="intro-word-1 block font-display text-7xl md:text-[9rem] font-extrabold tracking-tighter text-cream">
              rarely
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="intro-word-2 block font-serif italic font-normal text-7xl md:text-[9rem] leading-[0.9] text-pink">
              seen
            </span>
          </span>
        </h1>
        <p className="intro-tag mt-8 max-w-md text-base md:text-xl text-cream/75 font-medium">
          all Indian homegrown brands in <span className="text-lime font-bold">one place</span>
        </p>
      </div>

      {/* progress line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-cream/10">
        <div className="intro-bar h-full w-full bg-lime origin-left" />
      </div>
    </div>
  );
}
