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
      <ol className="mx-auto max-w-6xl px-4 space-y-3">
        {collection.brands.map((s, i) => {
          const b = getBrand(s)!;
          return (
            <li key={s}>
              <Link to="/brands/$slug" params={{ slug: s }} className="flex items-center gap-5 rounded-3xl border-2 border-ink bg-card p-4 shadow-brut hover:-translate-y-0.5 transition">
                <span className={`${swatch[b.color]} size-16 shrink-0 rounded-2xl border-2 border-ink grid place-items-center font-display text-2xl font-extrabold`}>{i + 1}</span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-extrabold">{b.name}</h3>
                  <p className="text-ink/70">{b.tagline}</p>
                </div>
                <span className="hidden sm:block font-semibold">{b.priceRange}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
