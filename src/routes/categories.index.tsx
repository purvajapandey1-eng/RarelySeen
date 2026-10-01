import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/lib/catalog";
import { PageHead, swatch } from "@/components/ui-bits";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Collections — Rarely Seen" },
      { name: "description", content: "Curated lists like tops under 3k, co-ord brands and the best birthday dress brands in India." },
      { property: "og:title", content: "Collections — Rarely Seen" },
      { property: "og:description", content: "Curated homegrown brand lists for every mood and budget." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <main className="pb-20">
      <PageHead kicker="curated lists" title={<>pick a <span className="font-serif italic font-normal">mood</span></>}>
        Collections for every budget, occasion and aesthetic.
      </PageHead>
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-4">
        {collections.map((c, i) => (
          <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className={`${swatch[c.color]} ${i === 0 ? "md:col-span-2" : ""} rounded-3xl border-2 border-ink p-8 min-h-60 flex flex-col justify-between shadow-brut hover:-translate-y-1 transition`}>
            <div className="flex justify-between"><span className="font-bold">{String(i + 1).padStart(2, "0")}</span><ArrowUpRight className="size-8" /></div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-none">{c.title}</h2>
              <p className="mt-2 opacity-80">{c.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
