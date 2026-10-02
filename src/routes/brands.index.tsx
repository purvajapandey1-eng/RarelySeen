import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { brands } from "@/lib/catalog";
import { PageHead, swatch } from "@/components/ui-bits";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "All brands — Rarely Seen" },
      { name: "description", content: "Every Indian homegrown fashion brand on Rarely Seen, from Jaipur block prints to Mumbai resort wear." },
      { property: "og:title", content: "All brands — Rarely Seen" },
      { property: "og:description", content: "Browse every Indian homegrown brand we've curated." },
    ],
  }),
  component: BrandsPage,
});

function BrandsPage() {
  const [q, setQ] = useState("");
  const list = brands.filter((b) => (b.name + b.city + b.vibe.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <main className="pb-20">
      <PageHead kicker={`${brands.length} labels`} title={<>the <span className="font-serif italic font-normal">brands</span></>}>
        Small studios, big energy. All homegrown.
      </PageHead>
      <div className="mx-auto max-w-6xl px-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search by name, city, vibe…" className="w-full md:w-96 rounded-full border-2 border-ink bg-card px-5 py-3 outline-none focus:shadow-brut" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((b) => (
            <Link key={b.slug} to="/brands/$slug" params={{ slug: b.slug }} className="rounded-3xl border-2 border-ink bg-card overflow-hidden shadow-brut hover:-translate-y-1 transition">
              <div className={`${swatch[b.color]} h-32 grid place-items-center font-display text-5xl font-extrabold overflow-hidden`}>
                {b.logo ? <img src={b.logo} alt={b.name} className="h-full w-full object-cover bg-white" /> : b.name[0]}
              </div>
              <div className="p-5">
                <div className="flex justify-between"><h3 className="font-display text-2xl font-extrabold">{b.name}</h3><span className="text-sm text-ink/60">{b.city}</span></div>
                <p className="text-ink/70 mt-1">{b.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1">{b.vibe.map((v) => <span key={v} className="text-xs rounded-full border border-ink px-2 py-0.5">{v}</span>)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
