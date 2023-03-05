import { Stack, ToggleButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";
import { IAppState } from "@store/index";
import { useNavigate } from "react-router-dom";
import { useGetMovieQueries } from "@store/reducers/movieApi";
import { Loader } from "@modules/components/Loader";
import { IGetMovieResponse } from "@typings/moviedb/responses";
import { BarChart } from "./BarChart";
import { removeDuplicates } from "@utils/helpers/array";
import { Filters } from "./Filters";
import { useEffect, useState } from "react";

export const filterMovies = (movies: IGetMovieResponse[], genres: string[]) => {
  return movies.filter(movie => genres.every(genre => {
    return movie.genres.map(genre => genre.name).includes(genre);
  }));
}

export const Favorite = () => {
  const navigate = useNavigate();

  const movieIds = useSelector((state: IAppState) => state.favorite.movieIds);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const movies = useGetMovieQueries(movieIds);
  const genres = movies?.flatMap(movie => movie.genres.map(genre => genre.name)).sort();

  useEffect(() => {
    if (!genres) return;
    if (selectedGenres.some(genre => !genres.includes(genre))) {
      const updatedSelectedGenres = selectedGenres.filter(genre => genres.includes(genre));
      setSelectedGenres(updatedSelectedGenres);
    }
  }, [genres]);

  if (!movies || !genres) return <Loader />;

  const uniqueGenres = removeDuplicates(genres);
  const filteredMovies = selectedGenres.length ? filterMovies(movies, selectedGenres) : movies;

  return (
    <Favorite.Wrapper>
      <Favorite.Container>
        <Stack flexDirection="row" flexWrap="wrap" gap="2.5em">
          <Stack flex="5" minWidth="20em" gap="1.5em">
            <BarChart genres={genres} />
          </Stack>
          <Stack flex="2" minWidth="25em" gap="1.5em">
            <Stack>
              <Typography variant="h5">
                Genres
              </Typography>
              <Typography variant="subtitle1" color="GrayText">
                Filter movies by genre
              </Typography>
            </Stack>
            <Filters 
              filters={uniqueGenres} 
              selected={selectedGenres}
              onChange={genres => setSelectedGenres(genres)}
            />
          </Stack>
        </Stack>
        <Favorite.MovieGrid>
          {filteredMovies.map(movie => (
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
  display: flex;
  flex-direction: column;
  gap: 2.5em;
`;

Favorite.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;