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

export interface IActor {
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  id: string;
}

export interface ICrewMember {
  name: string;
  original_name: string;
  jobs: string[];
  profile_path: string | null;
  id: string;
}

export interface IBaseCrewMember {
  name: string;
  original_name: string;
  job: string;
  profile_path: string | null;
  id: string;
}

export interface IVideo {
  type: "Trailer";
  site: "YouTube";
  name: string;
  id: string;
  key: string;
}