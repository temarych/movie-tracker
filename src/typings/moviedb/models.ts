export interface IMovie {
  title: string;
  poster_path: string | null;
  vote_average: number;
  id: string;
}

export interface IImage {
  file_path: string;
}

export interface IAuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface IReview {
  content: string;
  id: string;
  author: string;
  author_details: IAuthorDetails;
}

export interface IVideo {
  type: "Trailer";
  site: "YouTube";
  name: string;
  id: string;
  key: string;
}

export interface IMovieCastCredit {
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  id: string;
}

export interface IMovieCrewCredit {
  name: string;
  original_name: string;
  job: string;
  profile_path: string | null;
  id: string;
}

export type IMovieCredit = IMovieCastCredit | IMovieCrewCredit;

export interface IMergedMovieCredit {
  name: string;
  original_name: string;
  duties: string[];
  profile_path: string | null;
  id: string;
}

export interface IPersonCastCredit {
  id: string;
  credit_id: string;
  title: string;
  overview: string;
  character: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
}

export interface IPersonCrewCredit {
  id: string;
  credit_id: string;
  title: string;
  overview: string;
  job: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
}

export type IPersonCredit = IPersonCrewCredit | IPersonCastCredit;

export interface IMergedPersonCredit {
  id: string;
  credit_id: string;
  title: string;
  overview: string;
  duties: string[];
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
}