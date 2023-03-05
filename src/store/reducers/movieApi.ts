import { IGetMoviesParams } from "@typings/moviedb/params";
import { 
  IGetMovieCreditsResponse,
  IGetMovieImagesResponse, 
  IGetMovieResponse, 
  IGetMovieReviewsResponse, 
  IGetMoviesResponse, 
  IGetPersonCreditsResponse, 
  IGetPersonImagesResponse, 
  IGetPersonResponse, 
  IGetReviewDetailsResponse, 
  IGetVideosResponse 
} from "@typings/moviedb/responses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

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
    }),
    getMovieCredits: builder.query<IGetMovieCreditsResponse, string>({
      query: id => `movie/${id}/credits?api_key=${apiKey}`
    }),
    getVideos: builder.query<IGetVideosResponse, string>({
      query: id => `movie/${id}/videos?api_key=${apiKey}`
    }),
    getPersonImages: builder.query<IGetPersonImagesResponse, string>({
      query: id => `person/${id}/images?api_key=${apiKey}`
    }),
    getPerson: builder.query<IGetPersonResponse, string>({
      query: id => `person/${id}?api_key=${apiKey}`
    }),
    getPersonCredits: builder.query<IGetPersonCreditsResponse, string>({
      query: id => `person/${id}/movie_credits?api_key=${apiKey}`
    }),
    getReviewDetails: builder.query<IGetReviewDetailsResponse, string>({
      query: id => `review/${id}?api_key=${apiKey}`
    })
  })
});

export const useGetMovieQueries = (ids: string[]) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const endpointQuery = movieApi.endpoints.getMovie;
  const initiateGetMovie = (id: string) => dispatch(endpointQuery.initiate(id));

  useEffect(() => {
    ids.map(id => initiateGetMovie(id));
  }, [ids, dispatch]);

  return useSelector(state => {
    const queries = ids.map(id => endpointQuery.select(id)(state as any));
    const results = queries.map(query => query.data);
    const movies = results.some(result => !result) ? undefined : results as IGetMovieResponse[];
    return movies;
  }, (a, b) => JSON.stringify(a) === JSON.stringify(b));
}

export const { 
  useGetMoviesQuery, 
  useGetMovieQuery, 
  useGetMovieImagesQuery,
  useGetMovieReviewsQuery,
  useGetMovieCreditsQuery,
  useGetVideosQuery,
  useGetPersonImagesQuery,
  useGetPersonQuery,
  useGetPersonCreditsQuery,
  useGetReviewDetailsQuery
} = movieApi;