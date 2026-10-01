import { createFileRoute, notFound } from "@tanstack/react-router";
import { designs, getBrand } from "@/lib/catalog";
import { DesignCard, PageHead } from "@/components/ui-bits";

export const Route = createFileRoute("/brands/$slug")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    return { brand };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Brand not found — Rarely Seen" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.brand.name} — Rarely Seen`;
    return { meta: [{ title: t }, { name: "description", content: loaderData.brand.tagline }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.brand.tagline }] };
  },
  notFoundComponent: () => <PageHead kicker="oops" title="brand not found" />,
  component: BrandPage,
});

function BrandPage() {
  const { brand } = Route.useLoaderData();
  return (
    <main className="pb-20">
      <PageHead kicker={`${brand.city} · ${brand.priceRange}`} title={brand.name}>{brand.tagline}</PageHead>
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {designs.filter((d) => d.brand === brand.slug).map((d) => <DesignCard key={d.id} d={d} />)}
      </div>
    </main>
  );
}
