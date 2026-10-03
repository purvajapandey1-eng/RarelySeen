import { createFileRoute, notFound } from "@tanstack/react-router";
import { designs, getBrand } from "@/lib/catalog";
import { DesignCard, PageHead } from "@/components/ui-bits";
import { useState, useEffect } from "react";
import { useLovedBrands } from "@/lib/loved-brands";
import { Heart } from "lucide-react";

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

const CATEGORIES = ["All", "Tops", "Dresses", "Indianwear", "Nightwear", "Skirt", "Shorts", "Pants"];

function BrandPage() {
  const { brand } = Route.useLoaderData();
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [displayCount, setDisplayCount] = useState(24);
  const { hasBrand, toggleBrand } = useLovedBrands();
  const on = hasBrand(brand.slug);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 800
      ) {
        setDisplayCount((prev) => prev + 24);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredDesigns = designs.filter((d) => {
    if (d.brand !== brand.slug) return false;
    
    // Category match
    if (category !== "All") {
      const nameLower = d.name.toLowerCase();
      const catLower = category.toLowerCase();
      
      if (catLower === "indianwear") {
        if (!nameLower.includes("kurta") && !nameLower.includes("saree") && !nameLower.includes("suit") && !nameLower.includes("lehenga") && !nameLower.includes("kurti") && !nameLower.includes("anarkali")) return false;
      } else if (catLower === "tops") {
        if (!nameLower.includes("top") && !nameLower.includes("shirt") && !nameLower.includes("blouse") && !nameLower.includes("tee") && !nameLower.includes("tunic")) return false;
      } else if (catLower === "dresses") {
        if (!nameLower.includes("dress") && !nameLower.includes("gown") && !nameLower.includes("midi") && !nameLower.includes("maxi") && !nameLower.includes("mini")) return false;
      } else if (catLower === "nightwear") {
        if (!nameLower.includes("night") && !nameLower.includes("pyjama") && !nameLower.includes("pajama") && !nameLower.includes("sleep")) return false;
      } else if (catLower === "skirt") {
        if (!nameLower.includes("skirt")) return false;
      } else if (catLower === "shorts") {
        if (!nameLower.includes("short")) return false;
      } else if (catLower === "pants") {
        if (!nameLower.includes("pant") && !nameLower.includes("trouser") && !nameLower.includes("jeans") && !nameLower.includes("denim")) return false;
      } else {
        if (!nameLower.includes(catLower)) return false;
      }
    }

    // Price match
    if (minPrice && !isNaN(Number(minPrice))) {
      if (d.price < Number(minPrice)) return false;
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      if (d.price > Number(maxPrice)) return false;
    }

    return true;
  });

  return (
    <main className="pb-20">
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <p className="inline-block rounded-full bg-lime border-2 border-ink px-3 py-1 text-xs font-bold uppercase tracking-widest">{brand.city} · {brand.priceRange}</p>
          <div className="flex items-center gap-4 mt-4">
            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">{brand.name}</h1>
            <button
              onClick={() => toggleBrand(brand.slug)}
              aria-label={on ? "Remove from loved brands" : "Love this brand"}
              className={`size-12 grid place-items-center rounded-full border-2 border-ink transition active:scale-90 flex-shrink-0 ${on ? "bg-pink-deep text-cream" : "bg-cream text-ink"}`}
            >
              <Heart className={`size-6 ${on ? "fill-current" : ""}`} />
            </button>
          </div>
          <p className="mt-4 max-w-xl text-lg text-ink/70">{brand.tagline}</p>
        </div>
        {brand.logo && <img src={brand.logo} alt="Brand Logo" className="w-24 h-24 object-contain rounded-2xl border-2 border-ink bg-white shadow-brut" />}
      </section>

      <div className="mx-auto max-w-6xl px-4 mb-8 space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold uppercase mr-2 opacity-60">Category:</span>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1.5 rounded-full border-2 border-ink text-sm font-semibold transition ${category === c ? "bg-ink text-cream" : "bg-cream text-ink hover:bg-ink/10"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center mt-4">
          <span className="text-sm font-bold uppercase mr-2 opacity-60">Price:</span>
          <input
            type="number"
            placeholder="Min ₹"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-full border-2 border-ink text-sm font-semibold bg-cream text-ink focus:outline-none focus:ring-2 focus:ring-pink-deep placeholder:text-ink/40"
          />
          <span className="text-sm font-bold opacity-60">-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 px-3 py-1.5 rounded-full border-2 border-ink text-sm font-semibold bg-cream text-ink focus:outline-none focus:ring-2 focus:ring-pink-deep placeholder:text-ink/40"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.slice(0, displayCount).map((d) => <DesignCard key={d.id} d={d} />)
        ) : (
          <div className="col-span-2 md:col-span-3 py-12 text-center border-2 border-ink border-dashed rounded-3xl">
            <p className="text-lg font-medium text-ink/60">No items match your filters.</p>
            <button onClick={() => { setCategory("All"); setMinPrice(""); setMaxPrice(""); }} className="mt-4 px-4 py-2 rounded-full bg-ink text-cream font-bold">Clear Filters</button>
          </div>
        )}
      </div>
    </main>
  );
}
