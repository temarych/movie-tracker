import { IBaseCrewMember, ICrewMember } from "@/typings/moviedb/models";
import { IGetMoviesParams } from "@/typings/moviedb/params";
import { 
  IBaseGetCreditsResponse, 
  IGetCreditsResponse, 
  IGetMovieImagesResponse, 
  IGetMovieResponse, 
  IGetMovieReviewsResponse, 
  IGetMoviesResponse, 
  IGetPersonImagesResponse, 
  IGetPersonResponse, 
  IGetVideosResponse 
} from "@/typings/moviedb/responses";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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