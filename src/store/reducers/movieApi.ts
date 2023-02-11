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

export interface IReview {
  content: string;
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

export interface IGetMovieImagesResponse {
  posters: IImage[];
  backdrops: IImage[];
}

export interface IGetMovieReviewsResponse {
  results: IReview[];
}

// Params

export interface IGetMoviesParams {
  page: number;
  query?: string | null;
}

export const apiKey = "c7e56d606e9e00077e3cfbdde20b77cc";

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
    })
  })
});

export const { 
  useGetMoviesQuery, 
  useGetMovieQuery, 
  useGetMovieImagesQuery,
  useGetMovieReviewsQuery
} = movieApi;