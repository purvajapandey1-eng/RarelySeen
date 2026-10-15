import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { brands, collections, designs } from "@/lib/catalog";
import { DesignCard, swatch } from "@/components/ui-bits";
import { Intro } from "@/components/Intro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rarely Seen — India's homegrown brands, curated" },
      { name: "description", content: "Discover the best Indian homegrown fashion brands. Curated collections, cult labels and designs you'll love." },
      { property: "og:title", content: "Rarely Seen — India's homegrown brands, curated" },
      { property: "og:description", content: "Discover the best Indian homegrown fashion brands, all in one place." },
    ],
  }),
  component: Index,
});

const collectionImages: Record<string, string> = {
  "tops-under-3k": "/tops.png",
  "co-ord-brands": "/coords.png",
  "birthday-dresses": "/birthday.png"
};

function Index() {
  const [trending, setTrending] = useState(() => [...designs].sort(() => 0.5 - Math.random()).slice(0, 8));
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setTrending([...designs].sort(() => 0.5 - Math.random()).slice(0, 8));
        setFade(false);
      }, 500);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Intro />
      <main>
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-12">
        <p className="inline-block rounded-full bg-pink border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-widest -rotate-2">made in india, obviously</p>
        <h1 className="font-display mt-6 text-6xl md:text-[8.5rem] font-extrabold leading-[0.85] tracking-tighter">
          brands your <br />feed hasn't <span className="font-serif italic font-normal text-pink-deep">found</span> yet.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-ink/70">The catalogue of Indian homegrown labels worth knowing. Browse brands, steal collection ideas, heart what you'd wear.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/brands" className="rounded-full bg-ink text-cream px-6 py-3 font-bold border-2 border-ink shadow-brut-lime hover:-translate-y-0.5 transition">explore brands →</Link>
        </div>
      </section>

      <div className="border-y-2 border-ink bg-lime overflow-hidden py-3">
        <div className="marquee flex gap-10 whitespace-nowrap font-display text-2xl font-extrabold">
          {[...brands, ...brands].map((b, i) => <span key={i}>{b.name} ✺</span>)}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <Link
          to="/categories/$slug"
          params={{ slug: "chic-diwali-on-budget" }}
          className="group relative block rounded-3xl border-2 border-ink overflow-hidden shadow-brut hover:-translate-y-1 transition-transform duration-300"
        >
          {/* Background image */}
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img
              src="/diwali-banner.png"
              alt="Chic Diwali on Budget"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

            {/* Decorative diya emoji strip */}
            <div className="absolute top-4 left-6 flex gap-2 text-xl opacity-80">
              <span>🪔</span><span>🌸</span><span>🪔</span>
            </div>

            {/* Text content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-amber-300 mb-3">
                ✦ Diwali Edit ✦
              </p>
              <h2 className="font-serif italic text-white text-3xl md:text-5xl leading-tight max-w-sm md:max-w-lg">
                Serve, don't splurge.
              </h2>
              <p className="font-display font-extrabold text-white text-xl md:text-3xl mt-1 max-w-sm md:max-w-lg leading-tight">
                Chic Diwali outfits on Budget
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-amber-400 text-ink font-bold text-sm px-5 py-2.5 rounded-full border-2 border-ink w-fit shadow-[3px_3px_0px_#050505] group-hover:shadow-none group-hover:translate-x-[3px] group-hover:translate-y-[3px] transition-all duration-200">
                Shop the edit
                <ArrowUpRight className="size-4" />
              </div>
            </div>

            {/* Right-side brand count badge */}
            <div className="absolute bottom-4 right-6 bg-white/90 backdrop-blur-sm border-2 border-ink rounded-2xl px-4 py-2 shadow-[3px_3px_0px_#050505]">
              <p className="text-xs font-bold text-ink/60 uppercase tracking-widest">Featuring</p>
              <p className="font-display font-extrabold text-ink text-lg leading-none">16 brands</p>
            </div>
          </div>
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="font-display text-4xl font-extrabold">collections</h2>
          <Link to="/categories" className="font-semibold underline">see all</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {collections.slice(0, 3).map((c) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className={`${swatch[c.color]} rounded-3xl border-2 border-ink flex flex-col shadow-brut hover:-translate-y-1 transition overflow-hidden group min-h-56`}>
              {(() => {
                const img = collectionImages[c.slug];
                return img ? (
                  <div className="h-32 border-b-2 border-ink overflow-hidden bg-white shrink-0 relative">
                    <img src={img} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-3 right-3 bg-cream rounded-full p-1 border-2 border-ink">
                      <ArrowUpRight className="size-5 text-ink" />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex justify-end shrink-0"><ArrowUpRight className="size-7" /></div>
                );
              })()}
              <div className="p-6 flex-1 flex flex-col justify-end">
                <h3 className="font-display text-3xl font-extrabold leading-tight">{c.title}</h3>
                <p className="mt-1 opacity-80">{c.brands.length} brands</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="font-display text-4xl font-extrabold mb-6">trending <span className="font-serif italic font-normal">rn</span></h2>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-500 ease-in-out ${fade ? "opacity-0" : "opacity-100"}`}>
          {trending.map((d) => <DesignCard key={d.id} d={d} />)}
        </div>
      </section>
      </main>
    </>
  );
}
