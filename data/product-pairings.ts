export interface ProductPairingEntry {
  productSlug: string;
  title: string;
  description: string;
}

export const productPairingsBySlug: Record<string, ProductPairingEntry[]> = {
  "ambre-nuit": [
    {
      productSlug: "velvet-rose",
      title: "Velvet Luminance",
      description:
        "Soft rose and amber create a warm, skin-like aura — luminous for evening without overwhelming.",
    },
    {
      productSlug: "noir-essence",
      title: "Nocturnal Depth",
      description:
        "Layer woody incense beneath golden amber for a darker, more commanding trail after dusk.",
    },
    {
      productSlug: "bois-dor",
      title: "Sandalwood Veil",
      description:
        "Creamy woods soften the spice, lending quiet sophistication to daytime wear.",
    },
  ],
  "velvet-rose": [
    {
      productSlug: "jasmin-soleil",
      title: "Solar Florals",
      description:
        "Sun-warmed jasmine lifts the rose heart with Mediterranean radiance and effortless grace.",
    },
    {
      productSlug: "ambre-nuit",
      title: "Amber Embrace",
      description:
        "A whisper of amber beneath the petals adds warmth and extraordinary staying power.",
    },
    {
      productSlug: "bois-dor",
      title: "Woodland Ground",
      description:
        "Pale cedar and sandalwood anchor the bouquet with understated, genderless elegance.",
    },
  ],
  "noir-essence": [
    {
      productSlug: "bois-dor",
      title: "Refined Woods",
      description:
        "Sandalwood and cedar temper smoky oud with a smoother, more wearable silhouette.",
    },
    {
      productSlug: "ambre-nuit",
      title: "Amber Counterpoint",
      description:
        "Golden vanilla softens leather and incense, revealing a surprisingly intimate dry down.",
    },
    {
      productSlug: "velvet-rose",
      title: "Floral Contrast",
      description:
        "A single spray of rose at the wrist introduces light against the composition's depth.",
    },
  ],
  "jasmin-soleil": [
    {
      productSlug: "velvet-rose",
      title: "Romantic Bouquet",
      description:
        "Centifolia rose deepens the jasmine heart into an opulent, unmistakably feminine accord.",
    },
    {
      productSlug: "bois-dor",
      title: "Driftwood Haze",
      description:
        "Dry woods and pale musk extend the floral trail with beach-light subtlety.",
    },
    {
      productSlug: "ambre-nuit",
      title: "Evening Glow",
      description:
        "Amber and vanilla transform the radiance into a warm, lingering presence after sunset.",
    },
  ],
  "safran-royale": [
    {
      productSlug: "ambre-nuit",
      title: "Golden Resonance",
      description:
        "Shared amber threads weave two orientals into a regal, harmonized signature.",
    },
    {
      productSlug: "noir-essence",
      title: "Imperial Shadow",
      description:
        "Leather and oud amplify saffron's spice for a commanding, evening-only statement.",
    },
    {
      productSlug: "velvet-rose",
      title: "Silken Contrast",
      description:
        "Rose de Mai offers a refined floral counterpoint to resinous woods and suede.",
    },
  ],
  "bois-dor": [
    {
      productSlug: "noir-essence",
      title: "Smoked Cedar",
      description:
        "Incense and vetiver lend shadow to sun-bleached woods — architectural and assured.",
    },
    {
      productSlug: "jasmin-soleil",
      title: "Fig & Blossom",
      description:
        "Dried fig meets orange blossom for a bright, Mediterranean opening over creamy sandalwood.",
    },
    {
      productSlug: "ambre-nuit",
      title: "Warm Resin",
      description:
        "Benzoin and vanilla enrich the wood base with a golden, skin-close finish.",
    },
  ],
};
