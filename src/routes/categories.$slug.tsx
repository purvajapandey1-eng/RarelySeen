import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBrand, getCollection } from "@/lib/catalog";
import { PageHead, swatch } from "@/components/ui-bits";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Collection not found — Rarely Seen" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.collection.title} — Rarely Seen`;
    return { meta: [{ title: t }, { name: "description", content: loaderData.collection.blurb }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.collection.blurb }] };
  },
  notFoundComponent: () => <PageHead kicker="oops" title="collection not found" />,
  component: CollectionPage,
});

function CollectionPage() {
  const { collection } = Route.useLoaderData();
  return (
    <main className="pb-20">
      <PageHead kicker="collection" title={collection.title}>{collection.blurb}</PageHead>
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collection.brands.map((s) => {
            const b = getBrand(s);
            if (!b) return null;
            return (
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
            );
          })}
        </div>
      </div>
    </main>
  );
}
