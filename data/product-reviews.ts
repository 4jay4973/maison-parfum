export interface ProductReview {
  id: number;
  author: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  date: string;
}

export interface RatingDistribution {
  stars: number;
  percent: number;
}

export const ratingDistribution: RatingDistribution[] = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 14 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 1 },
];

export const sampleReviews: ProductReview[] = [
  {
    id: 1,
    author: "Isabelle Laurent",
    rating: 5,
    title: "Quietly unforgettable",
    body: "This wears like a second skin. The opening is bright without being sharp, and the dry down is impossibly warm. I receive compliments hours after applying.",
    verified: true,
    date: "March 2026",
  },
  {
    id: 2,
    author: "James Moreau",
    rating: 5,
    title: "True luxury",
    body: "Refined, balanced, and long-lasting. It feels curated rather than loud — exactly what I want from a maison fragrance.",
    verified: true,
    date: "February 2026",
  },
  {
    id: 3,
    author: "Elena Vasquez",
    rating: 4,
    title: "Beautiful evolution",
    body: "The heart notes are especially lovely in the evening. I would love a slightly softer opening, but the overall composition is stunning.",
    verified: true,
    date: "January 2026",
  },
];
