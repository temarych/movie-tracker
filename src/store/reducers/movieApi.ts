import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Models

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

// Responses

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

export interface IGetCreditsResponse {
  cast: IActor[];
  crew: ICrewMember[];
}

export interface IBaseGetCreditsResponse {
  cast: IActor[];
  crew: IBaseCrewMember[];
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
}

// Params

export interface IGetMoviesParams {
  page: number;
  query?: string | null;
}

export const apiKey = "c7e56d606e9e00077e3cfbdde20b77cc";

export const getCrew = (baseCrew: IBaseCrewMember[]): ICrewMember[] => {
  const crewIds = Array.from(new Set(baseCrew.map(crewMember => crewMember.id)));
  return crewIds.map(crewId => {
    const baseCrewMembers = baseCrew.filter(baseCrewMember => baseCrewMember.id === crewId);
    const jobs = baseCrewMembers.map(baseCrewMember => baseCrewMember.job);
    const baseCrewMember = baseCrewMembers[0];
    return { ...baseCrewMember, jobs };
  });
}

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "https://api.themoviedb.org/3/"
  }),
  endpoints: builder => ({
    getMovies: builder.query<IGetMoviesResponse, IGetMoviesParams>({
      query: params => params.query && (params.query.length > 1) 
        ? `search/movie?api_key=${apiKey}&page=${params.page}&query=${params.query}`
        : `movie/popular?api_key=${apiKey}&page=${params.page}`
    }),
    getMovie: builder.query<IGetMovieResponse, string>({
      query: id => `movie/${id}?api_key=${apiKey}`
    }),
    getMovieImages: builder.query<IGetMovieImagesResponse, string>({
      query: id => `movie/${id}/images?api_key=${apiKey}`
    }),
    getMovieReviews: builder.query<IGetMovieReviewsResponse, string>({
      query: id => `movie/${id}/reviews?api_key=${apiKey}`
    }),
    getCredits: builder.query<IGetCreditsResponse, string>({
      query: id => `movie/${id}/credits?api_key=${apiKey}`,
      transformResponse(response: IBaseGetCreditsResponse, meta, arg) {
        return { ...response, crew: getCrew(response.crew) }
      }
    }),
    getVideos: builder.query<IGetVideosResponse, string>({
      query: id => `movie/${id}/videos?api_key=${apiKey}`
    }),
    getPersonImages: builder.query<IGetPersonImagesResponse, string>({
      query: id => `person/${id}/images?api_key=${apiKey}`
    }),
    getPerson: builder.query<IGetPersonResponse, string>({
      query: id => `person/${id}?api_key=${apiKey}`
    })
  })
});

export const { 
  useGetMoviesQuery, 
  useGetMovieQuery, 
  useGetMovieImagesQuery,
  useGetMovieReviewsQuery,
  useGetCreditsQuery,
  useGetVideosQuery,
  useGetPersonImagesQuery,
  useGetPersonQuery
} = movieApi;