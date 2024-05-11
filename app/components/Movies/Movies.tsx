export default interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    name: string;
    total_pages: number;
    genres: { id: number; name: string }[];
  }