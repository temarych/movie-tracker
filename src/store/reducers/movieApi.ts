import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IMovie {
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface IGetMoviesResponse {
  results: IMovie[];
  page: number;
  total_results: number;
  total_pages: number;
}

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
    })
  })
});

export const { useGetMoviesQuery } = movieApi;