export type Genre = {
  id: number;
  name: string;
};

export type Platform = {
  id: number;
  name: string;
};

export type Games = {
  count: number;
  results: any[];
};

export type Game = {
  name: string;
  background_image: string;
  id: number;
  released: string;
  rating: number;
  genres: { name: string }[];
  platforms: { platform: { name: string } }[];
  description_raw: string;
  description: TrustedHTML;
  playtime: number;
  ratings_count: number;
  website: string;
  tags: { name: string };
  developers: { name: string }[];
  reddit_url: string;
};

export type Screenshots = { image: string }[];
