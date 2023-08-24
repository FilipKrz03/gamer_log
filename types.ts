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
  relased: string;
  rating: number;
  genres: { name: string }[];
  platforms: {platform:{name:string}}[];
};
