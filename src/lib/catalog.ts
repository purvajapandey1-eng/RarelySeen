export type Brand = {
  slug: string;
  name: string;
  city: string;
  tagline: string;
  vibe: string[];
  priceRange: string;
  color: "lime" | "pink" | "sky" | "sun" | "ink";
  logo?: string;
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
  { slug: "bunaai", name: "Bunaai", city: "Jaipur", tagline: "Block prints that hit different", vibe: ["ethnic", "cotton", "co-ords"], priceRange: "₹1.5k–4k", color: "sun" },
  { slug: "summer-somewhere", name: "Summer Somewhere", city: "Mumbai", tagline: "Vacation mode, permanently", vibe: ["resort", "dresses"], priceRange: "₹2k–6k", color: "sky" },
  { slug: "the-label-life", name: "The Label Life", city: "Mumbai", tagline: "Elevated basics for main characters", vibe: ["workwear", "tops"], priceRange: "₹1.8k–5k", color: "ink" },
  { slug: "littlebox", name: "Littlebox", city: "Delhi", tagline: "Y2K energy, desi heart", vibe: ["tops", "party"], priceRange: "₹800–2.5k", color: "pink" },
  { slug: "naina-jain", name: "Okhai", city: "Gujarat", tagline: "Handcrafted by artisan women", vibe: ["handloom", "kurtas"], priceRange: "₹1k–3.5k", color: "lime" },
  { slug: "berrylush", name: "Berrylush", city: "Bengaluru", tagline: "Trendy fits, wallet friendly", vibe: ["tops", "dresses"], priceRange: "₹700–2k", color: "pink" },
  { slug: "kalki-co", name: "Fableist", city: "Bengaluru", tagline: "Slow fashion, loud style", vibe: ["sustainable", "co-ords"], priceRange: "₹2k–5k", color: "lime" },
  { slug: "nicobar", name: "Nicobar", city: "Delhi", tagline: "Modern Indian, worldly soul", vibe: ["lifestyle", "linen"], priceRange: "₹3k–9k", color: "sky" },
  { slug: "pink-fort", name: "Pink Fort", city: "Jaipur", tagline: "Pretty prints, birthday ready", vibe: ["dresses", "party"], priceRange: "₹2.5k–6k", color: "sun" },
];

export const collections: Collection[] = [
  { slug: "tops-under-3k", title: "Tops under 3k", blurb: "Cute tops that won't wreck your bank balance.", brands: ["littlebox", "berrylush", "the-label-life", "bunaai", "kuuky", "bluer", "corecotton", "outdated", "theclothingfactory", "outzidr", "couchdays", "endlesssummershop", "weavingcult", "twelvthedit", "truewest", "rerunn", "themissyco", "shopmauve", "shopdiris", "qua", "outcasts", "orangeateight", "shopandyours", "kindinside", "houseofmae", "msmaven", "muvazo", "nefsfinds", "nishorama", "leaclothingco", "labelsocietyco", "butterbawd", "andthensome", "autumnsummer", "beeglee", "blomas", "essgee", "evierose", "fancypastels", "contemponari", "girlsdontdressforboys", "freyjaworld", "loveviana", "oyela"], color: "lime" },
  { slug: "co-ord-brands", title: "Co-ord brands", blurb: "Matching sets = zero outfit stress.", brands: ["bunaai", "kalki-co", "the-label-life", "summer-somewhere", "surma", "kuuky", "corecotton", "couchdays", "outzidr", "endlesssummershop", "weavingcult", "shopmeringue", "themissyco", "summeraway", "shopdiris", "nishorama", "orangeateight", "poppi", "ribelle", "ruiaan", "outcasts", "nete", "neelmii", "muvazo", "msmaven", "moontara", "lovetobag", "lovechoje", "everdion", "studioimsoo", "houseofmae", "fancypastels", "evierose", "essgee", "blomas", "amoshi", "1030pm"], color: "pink" },
  { slug: "birthday-dresses", title: "Best birthday dress brands", blurb: "Your day, your fit. Slay accordingly.", brands: ["pink-fort", "summer-somewhere", "littlebox", "berrylush", "theclothingfactory", "weavingcult", "outdated", "studiopicante", "shopmeringue", "rerunn", "ribelle", "shopandyours", "shopmauve", "summeraway", "themissyco", "truewest", "shopdiris", "leaclothingco", "orangeateight", "outcasts", "mazikien", "nefsfinds", "qalaclothing", "nishorama", "qua", "amoshi", "1030pm", "blomas", "evierose", "kindinside", "autumnsummer", "beeglee", "labelsocietyco", "sanhi", "loveviana"], color: "sun" },
  { slug: "handloom-heroes", title: "Handloom heroes", blurb: "Made by hand, worn with pride.", brands: ["naina-jain", "nicobar", "bunaai", "surma", "corecotton", "nishorama", "themissyco", "nete", "neelmii", "fancypastels", "leaclothingco", "lovetobag", "msmaven", "blomas", "1030pm", "dhoraindia", "essgee", "unnisbees"], color: "sky" },
  { slug: "vacay-fits", title: "Vacay fits", blurb: "Goa? Gokarna? Packed and ready.", brands: ["summer-somewhere", "nicobar", "kalki-co", "themissyco", "shopmeringue", "theclothingfactory", "corecotton", "kuuky", "endlesssummershop", "outdated", "studiopicante", "ruiaan", "qua", "qalaclothing", "shopandyours", "shopdiris", "shopmauve", "summeraway", "sundayloveshop", "leaclothingco", "nefsfinds", "lovechoje", "moontara", "poppi", "outcasts", "orangeateight", "1030pm", "amoshi", "autumnsummer", "blomas", "essgee", "fancypastels", "dhoraindia", "evierose"], color: "ink" },
  { slug: "beachwear", title: "Beachwear", blurb: "Sun, sand, and the perfect outfit.", brands: ["kuuky", "ribelle", "sundayloveshop", "themissyco", "shopmeringue", "nete", "nefsfinds", "leaclothingco", "essgee"], color: "sky" },
  { slug: "footwear", title: "Footwear", blurb: "Step up your shoe game.", brands: ["summeraway", "pariparilife", "houseofprisca", "thedisobedience", "birdhouse"], color: "lime" },
  { slug: "bags", title: "Bags", blurb: "Carry your world in style.", brands: ["theclothingfactory", "dhoraindia", "everpret", "lovetobag", "nefsfinds", "nete", "palay", "rerunn", "themissyco", "noticeme"], color: "sun" },
  { slug: "jewellery", title: "Jewellery", blurb: "The final touch to every fit.", brands: ["upakarna", "nonamejewelry", "nete", "mnsh", "shopmaya", "jewelsmars", "dhoraindia", "iblamebeads", "alittleextra", "autumnsummer", "thefuncompany"], color: "pink" },
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
