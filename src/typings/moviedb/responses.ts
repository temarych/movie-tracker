import { 
  IAuthorDetails, 
  IImage, 
  IMovie, 
  IMovieCastCredit, 
  IMovieCrewCredit, 
  IMovieGenre, 
  IMovieStatus, 
  IPersonCastCredit, 
  IPersonCrewCredit, 
  IReview, 
  IVideo 
} from "./models";

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
  status: IMovieStatus;
  genres: IMovieGenre[];
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
  profile_path: string | null;
}

export interface IGetPersonCreditsResponse {
  crew: IPersonCrewCredit[];
  cast: IPersonCastCredit[];
}

export interface IGetReviewDetailsResponse {
  id: string;
  author: string;
  author_details: IAuthorDetails;
  content: string;
  media_id: number;
  media_title: string;
  media_type: string;
  created_at: string;
  updated_at: string;
  url: string;
}