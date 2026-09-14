// Single source of truth for business details — referenced by the navbar,
// hero, services, quote form, footer and the LocalBusiness JSON-LD.
export const site = {
  name: "Performance One Pressure Washing",
  shortName: "Performance One",
  // Vercel exposes the project's production domain at build time (a custom
  // domain once one is attached), so canonical/OG/schema URLs follow the deploy.
  url: process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000",
  phone: "(951) 313-0942",
  phoneHref: "tel:+19513130942",
  locality: "Riverside",
  region: "CA",
  postalCode: "92501",
  areas: [
    "Riverside",
    "Corona",
    "Moreno Valley",
    "Norco",
    "Jurupa Valley",
    "Ontario",
    "Chino",
    "Eastvale",
  ],
};

export const services = [
  {
    id: "house",
    title: "House Washing",
    description: "Gentle soft wash that removes algae, mold, and dirt without damaging your siding.",
    image: "/services/house_after.jpg",
  },
  {
    id: "driveway",
    title: "Driveway & Concrete",
    description: "Deep pressure cleaning that removes oil stains and years of ground-in grime.",
    image: "/services/driveway_after.jpg",
  },
  {
    id: "roof",
    title: "Roof Soft Washing",
    description: "Eliminate black streaks and moss growth with our safe, low-pressure treatment.",
    image: "/services/roof_after.jpg",
  },
  {
    id: "deck",
    title: "Deck & Patio",
    description: "Bring outdoor living spaces back to life with specialized wood and stone cleaning.",
    image: "/services/deck_after.jpg",
  },
  {
    id: "fence",
    title: "Fence Cleaning",
    description: "Restore the original beauty of your wood or vinyl fence, removing years of weathering.",
    image: "/services/fence_after.png",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Keep your storefront and walkways looking professional and inviting for customers.",
    image: "/services/commercial_after.jpg",
  },
] as const;

export type ServiceId = (typeof services)[number]["id"];
