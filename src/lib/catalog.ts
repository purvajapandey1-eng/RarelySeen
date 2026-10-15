export type Brand = {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  vibe: string[];
  priceRange: string;
  color: "lime" | "pink" | "sky" | "sun" | "ink";
  logo?: string;
  coverImage?: string;
};

export type Design = {
  id: string;
  brand: string;
  name: string;
  price: number;
  color: Brand["color"];
  image?: string;
  url?: string;
};

export type Collection = {
  slug: string;
  title: string;
  blurb: string;
  brands: string[];
  color: Brand["color"];
};

export const brands: Brand[] = [
  { slug: "naina-jain", name: "Okhai", city: "Gujarat", tagline: "Handcrafted by artisan women", vibe: ["handloom", "kurtas"], priceRange: "₹1k–3.5k", color: "lime", coverImage: "/brands/naina-jain.jpg" },
];

export const collections: Collection[] = [
  { slug: "tops-under-3k", title: "Tops under 3k", blurb: "Cute tops that won't wreck your bank balance.", brands: ["kuuky", "bluer", "corecotton", "outdated", "theclothingfactory", "outzidr", "couchdays", "endlesssummershop", "weavingcult", "twelvthedit", "truewest", "rerunn", "themissyco", "shopmauve", "shopdiris", "qua", "outcasts", "orangeateight", "shopandyours", "kindinside", "houseofmae", "msmaven", "muvazo", "nefsfinds", "nishorama", "leaclothingco", "labelsocietyco", "butterbawd", "andthensome", "autumnsummer", "beeglee", "blomas", "essgee", "evierose", "fancypastels", "contemponari", "girlsdontdressforboys", "freyjaworld", "loveviana", "oyela"], color: "lime" },
  { slug: "co-ord-brands", title: "Co-ord brands", blurb: "Matching sets = zero outfit stress.", brands: ["surma", "kuuky", "corecotton", "couchdays", "outzidr", "endlesssummershop", "weavingcult", "shopmeringue", "themissyco", "summeraway", "shopdiris", "nishorama", "orangeateight", "poppi", "ribelle", "ruiaan", "outcasts", "nete", "neelmii", "muvazo", "msmaven", "moontara", "lovetobag", "lovechoje", "everdion", "studioimsoo", "houseofmae", "fancypastels", "evierose", "essgee", "blomas", "amoshi", "1030pm"], color: "pink" },
  { slug: "birthday-dresses", title: "Best birthday dress brands", blurb: "Your day, your fit. Slay accordingly.", brands: ["theclothingfactory", "weavingcult", "outdated", "studiopicante", "shopmeringue", "rerunn", "ribelle", "shopandyours", "shopmauve", "summeraway", "themissyco", "truewest", "shopdiris", "leaclothingco", "orangeateight", "outcasts", "mazikien", "nefsfinds", "qalaclothing", "nishorama", "qua", "amoshi", "1030pm", "blomas", "evierose", "kindinside", "autumnsummer", "beeglee", "labelsocietyco", "sanhi", "loveviana"], color: "sun" },
  { slug: "handloom-heroes", title: "Handloom heroes", blurb: "Made by hand, worn with pride.", brands: ["naina-jain", "surma", "corecotton", "nishorama", "themissyco", "nete", "neelmii", "fancypastels", "leaclothingco", "lovetobag", "msmaven", "blomas", "1030pm", "dhoraindia", "essgee", "unnisbees"], color: "sky" },
  { slug: "vacay-fits", title: "Vacay fits", blurb: "Goa? Gokarna? Packed and ready.", brands: ["themissyco", "shopmeringue", "theclothingfactory", "corecotton", "kuuky", "endlesssummershop", "outdated", "studiopicante", "ruiaan", "qua", "qalaclothing", "shopandyours", "shopdiris", "shopmauve", "summeraway", "sundayloveshop", "leaclothingco", "nefsfinds", "lovechoje", "moontara", "poppi", "outcasts", "orangeateight", "1030pm", "amoshi", "autumnsummer", "blomas", "essgee", "fancypastels", "dhoraindia", "evierose"], color: "ink" },
  { slug: "beachwear", title: "Beachwear", blurb: "Sun, sand, and the perfect outfit.", brands: ["ribelle", "sundayloveshop", "themissyco", "shopmeringue", "nete", "nefsfinds", "leaclothingco", "essgee"], color: "sky" },
  { slug: "footwear", title: "Footwear", blurb: "Step up your shoe game.", brands: ["summeraway", "pariparilife", "houseofprisca", "thedisobedience", "birdhouse"], color: "lime" },
  { slug: "bags", title: "Bags", blurb: "Carry your world in style.", brands: ["theclothingfactory", "dhoraindia", "everpret", "lovetobag", "nefsfinds", "nete", "palay", "rerunn", "themissyco", "noticeme"], color: "sun" },
  { slug: "jewellery", title: "Jewellery", blurb: "The final touch to every fit.", brands: ["upakarna", "nonamejewelry", "nete", "mnsh", "shopmaya", "jewelsmars", "dhoraindia", "iblamebeads", "alittleextra", "autumnsummer", "thefuncompany"], color: "pink" },
  { slug: "chic-diwali-on-budget", title: "Chic Diwali on Budget", blurb: "Festive fits that look expensive, spend less.", brands: ["houseofayuda", "weartag", "diyaribydivish", "muskhaveshop", "dashanddot", "kelin", "alayabystage3", "studiopicante", "oyela", "miraiindia", "poshakhub", "basata", "wabisabistyles", "qunic", "dionne", "pastmodern"], color: "sun" },
];

import scrapedBrandsData from "./scraped_brands.json";
const scrapedBrands: Record<string, any> = scrapedBrandsData;

const scrapedBrandEntries = Object.entries(scrapedBrands);

scrapedBrandEntries.forEach(([slug, brand]: [string, any], i) => {
  brands.unshift({
    slug,
    name: brand.name,
    city: "Online",
    tagline: "Discovered on Rarely Seen",
    vibe: ["fashion"],
    priceRange: "₹1k–5k",
    color: (["lime", "pink", "sky", "sun", "ink"] as const)[i % 5],
    logo: brand.logo,
    coverImage: brand.coverImage || brand.products?.[0]?.image,
  });
});

const names = ["Mirage Top", "Sunday Co-ord", "Gulmohar Dress", "Chai Shirt", "Indigo Set", "Petal Midi"];
export const designs: Design[] = [
  ...scrapedBrandEntries.flatMap(([slug, brand]: [string, any], bi) =>
    brand.products.map((item: any, i: number) => ({
      id: `${slug}-${i}`,
      brand: slug,
      name: item.title,
      price: parseFloat(item.price) || 0,
      color: (["lime", "pink", "sky", "sun", "ink"] as const)[(bi + i) % 5],
      image: item.image,
      url: item.handle ? `${brand.url}/products/${item.handle}` : undefined,
    }))
  ),
  ...brands.filter(b => !scrapedBrands[b.slug]).flatMap((b, bi) =>
    [0, 1, 2].map((i) => ({
      id: `${b.slug}-${i}`,
      brand: b.slug,
      name: names[(bi + i) % names.length]!,
      price: 999 + ((bi * 3 + i) * 437) % 4000,
      color: (["lime", "pink", "sky", "sun", "ink"] as const)[(bi + i) % 5]!,
    }))
  )
];

export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
