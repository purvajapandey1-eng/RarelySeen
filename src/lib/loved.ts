import { useEffect, useState } from "react";

const KEY = "rarely-seen-loved";
const listeners = new Set<() => void>();

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function useLoved() {
  const [loved, setLoved] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setLoved(read());
    sync();
    listeners.add(sync);
    return () => void listeners.delete(sync);
  }, []);
  const toggle = (id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((l) => l());
  };
  return { loved, toggle, has: (id: string) => loved.includes(id) };
}
