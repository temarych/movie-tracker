import { IImage, IMovie, IMovieCastCredit, IMovieCrewCredit, IPersonCastCredit, IPersonCrewCredit, IReview, IVideo } from "./models";

export interface IGetMoviesResponse {
  results: IMovie[];
  page: number;
  total_results: number;
  total_pages: number;
}

export interface IGetMovieResponse {
  title: string;
  poster_path: string | null;
  vote_average: number;
  id: string;
  overview: string;
  revenue: number;
  budget: number;
  release_date: string;
  status: "Rumoured" | "Planned" | "In Production" | "Post Production" | "Released" | "Canceled";
}

export interface IGetMovieImagesResponse {
  posters: IImage[];
  backdrops: IImage[];
}

export interface IGetMovieReviewsResponse {
  results: IReview[];
}

export interface IGetMovieCreditsResponse {
  cast: IMovieCastCredit[];
  crew: IMovieCrewCredit[];
}

export interface IGetVideosResponse {
  results: IVideo[];
}

export interface IGetPersonImagesResponse {
  profiles: IImage[];
}

export interface IGetPersonResponse {
  id: string;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
  popularity: number;
}

export interface IGetPersonCreditsResponse {
  crew: IPersonCrewCredit[];
  cast: IPersonCastCredit[];
}