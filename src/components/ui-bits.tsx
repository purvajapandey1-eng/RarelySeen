import { Link, useRouter } from "@tanstack/react-router";
import { Heart, ArrowLeft } from "lucide-react";
import { getBrand, type Design } from "@/lib/catalog";
import { useLoved } from "@/lib/loved";
import { useLovedBrands } from "@/lib/loved-brands";
import type { ReactNode } from "react";

export const swatch: Record<string, string> = {
  lime: "bg-lime text-ink",
  pink: "bg-pink text-ink",
  sky: "bg-sky text-ink",
  sun: "bg-sun text-ink",
  ink: "bg-ink text-cream",
};

export function Nav() {
  const { loved } = useLoved();
  const { lovedBrands } = useLovedBrands();
  const router = useRouter();
  const isHome = router.state.location.pathname === "/";

  const link = "px-4 py-2 rounded-full border-2 border-ink font-semibold text-sm hover:bg-ink hover:text-cream whitespace-nowrap transition flex-shrink-0";
  const active = { className: "bg-ink text-cream" };
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b-2 border-ink">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button onClick={() => router.history.back()} className="size-10 grid flex-shrink-0 place-items-center rounded-full border-2 border-ink hover:bg-ink hover:text-cream transition" aria-label="Go back">
              <ArrowLeft className="size-5" />
            </button>
          )}
          <Link to="/" className="font-display text-2xl font-extrabold tracking-tight whitespace-nowrap">
            rarely<span className="font-serif italic font-normal text-pink-deep"> seen</span>
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-1 md:pb-0 items-center">
          <Link to="/brands" className={link} activeProps={active}>brands</Link>
          <Link to="/categories" className={link} activeProps={active}>categories</Link>
          <Link to="/fav-brands" className={link + " flex items-center gap-1"} activeProps={active}>
             fav brands {lovedBrands.length > 0 && <span>({lovedBrands.length})</span>}
          </Link>
          <Link to="/loved" className={link + " flex items-center gap-1"} activeProps={active}>
            <Heart className="size-4" /> loved {loved.length > 0 && <span>({loved.length})</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function PageHead({ kicker, title, children, logo }: { kicker: string; title: ReactNode; children?: ReactNode; logo?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
      <div>
        <p className="inline-block rounded-full bg-lime border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-widest">{kicker}</p>
        <h1 className="font-display mt-4 text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">{title}</h1>
        {children && <p className="mt-4 max-w-xl text-lg text-ink/70">{children}</p>}
      </div>
      {logo && <img src={logo} alt="Brand Logo" className="w-24 h-24 object-contain rounded-2xl border-2 border-ink bg-white shadow-brut" />}
    </section>
  );
}

export function DesignCard({ d }: { d: Design }) {
  const { has, toggle } = useLoved();
  const b = getBrand(d.brand)!;
  const on = has(d.id);
  return (
    <div className="group rounded-3xl border-2 border-ink bg-card overflow-hidden shadow-brut hover:-translate-y-1 transition">
      <div className={`relative aspect-[4/5] ${swatch[d.color]} flex items-end p-4 overflow-hidden`}>
        {d.url ? (
          <a href={d.url} target="_blank" rel="noreferrer" className="absolute inset-0 z-0">
            {d.image && <img src={d.image} alt={d.name} className="h-full w-full object-cover" />}
          </a>
        ) : (
          d.image && <img src={d.image} alt={d.name} className="absolute inset-0 h-full w-full object-cover z-0" />
        )}
        
        {!d.image && (
          d.url ? (
             <a href={d.url} target="_blank" rel="noreferrer" className="z-10 relative font-serif italic text-4xl leading-none opacity-90 hover:underline hover:text-ink/80">{d.name}</a>
          ) : (
             <span className="font-serif italic text-4xl leading-none opacity-90 z-10 relative pointer-events-none">{d.name}</span>
          )
        )}

        <button
          onClick={() => toggle(d.id)}
          aria-label={on ? "Remove from loved" : "Love this design"}
          className={`absolute top-3 right-3 size-11 grid place-items-center rounded-full border-2 border-ink transition active:scale-90 ${on ? "bg-pink-deep text-cream" : "bg-cream text-ink"}`}
        >
          <Heart className={`size-5 ${on ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div>
          <Link to="/brands/$slug" params={{ slug: b.slug }} className="text-xs font-bold uppercase tracking-wider text-ink/60 hover:underline">{b.name}</Link>
          <p className="font-semibold">{d.name}</p>
        </div>
        <span className="font-display font-bold">₹{d.price.toLocaleString("en-IN")}</span>
      </div>
    </div>
  );
}
