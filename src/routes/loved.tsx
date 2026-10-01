import { createFileRoute, Link } from "@tanstack/react-router";
import { designs } from "@/lib/catalog";
import { useLoved } from "@/lib/loved";
import { DesignCard, PageHead } from "@/components/ui-bits";

export const Route = createFileRoute("/loved")({
  head: () => ({
    meta: [
      { title: "Loved — Rarely Seen" },
      { name: "description", content: "Your hearted designs from India's best homegrown brands." },
      { property: "og:title", content: "Loved — Rarely Seen" },
      { property: "og:description", content: "Your personal moodboard of homegrown designs." },
    ],
  }),
  component: LovedPage,
});

function LovedPage() {
  const { loved } = useLoved();
  const items = designs.filter((d) => loved.includes(d.id));
  return (
    <main className="pb-20">
      <PageHead kicker={`${items.length} saved`} title={<>your <span className="font-serif italic font-normal text-pink-deep">loved</span> list</>}>
        Tap the heart on any design and it lands here.
      </PageHead>
      <div className="mx-auto max-w-6xl px-4">
        {items.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-ink p-12 text-center">
            <p className="font-display text-3xl font-extrabold">nothing here yet 👀</p>
            <Link to="/brands" className="mt-4 inline-block rounded-full bg-ink text-cream px-6 py-3 font-bold">go find something</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map((d) => <DesignCard key={d.id} d={d} />)}</div>
        )}
      </div>
    </main>
  );
}
