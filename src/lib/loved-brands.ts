import { useEffect, useState } from "react";

const KEY = "rarely-seen-loved-brands";
const listeners = new Set<() => void>();

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useLovedBrands() {
  const [lovedBrands, setLovedBrands] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setLovedBrands(read());
    sync();
    listeners.add(sync);
    return () => void listeners.delete(sync);
  }, []);
  const toggleBrand = (slug: string) => {
    const cur = read();
    const next = cur.includes(slug) ? cur.filter((x) => x !== slug) : [...cur, slug];
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
  };
  return { lovedBrands, toggleBrand, hasBrand: (slug: string) => lovedBrands.includes(slug) };
}
