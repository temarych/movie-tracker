import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";
import { IAppState } from "@store/index";
import { useNavigate } from "react-router-dom";
import { useGetMovieQueries } from "@store/reducers/movieApi";
import { Loader } from "@modules/components/Loader";
import { IGetMovieResponse } from "@typings/moviedb/responses";

export const Favorite = () => {
  const navigate = useNavigate();
  const movieIds = useSelector((state: IAppState) => state.favorite.movieIds);
  const { queries: movieQueries, areLoaded: areMoviesLoaded } = useGetMovieQueries(movieIds);

  if (!areMoviesLoaded) return <Loader />;

  const movies = movieQueries.map(movieQuery => movieQuery.data as IGetMovieResponse);

  return (
    <Favorite.Wrapper>
      <Favorite.Container>
        <Favorite.MovieGrid>
          {movies.map(movie => (
            <motion.div 
              key={movie.id}
              whileHover={{ scale: 1.025 }} 
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <MovieCard data={movie} />
            </motion.div>
          ))}
        </Favorite.MovieGrid>
      </Favorite.Container>
    </Favorite.Wrapper>
  );
}

Favorite.MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  gap: 1.5em;
`;

Favorite.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
`;

Favorite.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;