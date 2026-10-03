import { createFileRoute } from "@tanstack/react-router";
import { useLovedBrands } from "@/lib/loved-brands";
import { brands } from "@/lib/catalog";
import { PageHead } from "@/components/ui-bits";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export const Route = createFileRoute("/fav-brands")({
  component: FavBrandsPage,
});

function FavBrandsPage() {
  const { lovedBrands, toggleBrand, hasBrand } = useLovedBrands();
  const favBrandsData = brands.filter((b) => lovedBrands.includes(b.slug));

  return (
    <main className="pb-20">
      <PageHead kicker="your favorites" title="loved brands">
        Brands you've saved for later.
      </PageHead>
      <div className="mx-auto max-w-6xl px-4 mt-8">
        {favBrandsData.length === 0 ? (
          <div className="text-center py-20 border-2 border-ink border-dashed rounded-3xl">
            <Heart className="size-12 mx-auto mb-4 text-ink/20" />
            <p className="text-lg font-medium text-ink/60">No brands loved yet.</p>
            <Link to="/brands" className="mt-4 inline-block font-bold underline hover:text-pink-deep">
              Explore brands
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favBrandsData.map((b) => {
              const on = hasBrand(b.slug);
              return (
                <Link key={b.slug} to="/brands/$slug" params={{ slug: b.slug }} className="group relative rounded-3xl border-2 border-ink bg-card p-6 shadow-brut hover:-translate-y-1 transition block">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl font-serif italic group-hover:underline">
                      {b.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleBrand(b.slug);
                      }}
                      aria-label={on ? "Remove from loved brands" : "Love this brand"}
                      className={`relative z-10 size-10 grid place-items-center rounded-full border-2 border-ink transition active:scale-90 ${on ? "bg-pink-deep text-cream" : "bg-cream text-ink"}`}
                    >
                      <Heart className={`size-5 ${on ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-ink/60 mb-2">{b.city} · {b.priceRange}</p>
                  <p className="font-medium">{b.tagline}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
