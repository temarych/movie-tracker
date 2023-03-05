import { InputAdornment, Stack, TextField } from "@mui/material";
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
import { useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { debounce } from "lodash";

export interface IFilterMoviesOptions {
  genres: string[];
  query: string;
}

export const filterMovies = (movies: IGetMovieResponse[], options: IFilterMoviesOptions) => {
  return movies.filter(movie => {
    const areGenresValid = options.genres.every(genre => {
      return movie.genres.map(genre => genre.name).includes(genre);
    });
    const isTitleValid = movie.title.toLowerCase().includes(options.query.toLowerCase());
    return areGenresValid && isTitleValid;
  });
}

export const Favorite = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const movieIds = useSelector((state: IAppState) => state.favorite.movieIds);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const movies = useGetMovieQueries(movieIds);
  
  const genres = useMemo(
    () => movies?.flatMap(movie => movie.genres.map(genre => genre.name)).sort(),
    [movies]
  );

  const filteredMovies = useMemo(
    () => {
      console.log(123)
      return movies && (selectedGenres.length || searchQuery) ? filterMovies(movies, {
        genres: selectedGenres,
        query: searchQuery
      }) : movies
    },
    [searchQuery, movies, selectedGenres]
  );

  const handleSearchQueryChange = useMemo(
    () => debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    }, 200),
    []
  );

  useEffect(() => {
    if (!genres) return;
    if (selectedGenres.some(genre => !genres.includes(genre))) {
      const updatedSelectedGenres = selectedGenres.filter(genre => genres.includes(genre));
      setSelectedGenres(updatedSelectedGenres);
    }
  }, [genres]);

  if (!filteredMovies || !genres) return <Loader />;

  const uniqueGenres = removeDuplicates(genres);

  return (
    <Favorite.Wrapper>
      <Favorite.Container>
        <Stack flexDirection="row" flexWrap="wrap" gap="2.5em">
          <Stack flex="5" minWidth="20em" gap="1.5em">
            <BarChart genres={genres} />
          </Stack>
          <Stack flex="2" minWidth="25em" gap="1.5em">
            <TextField 
              placeholder="Search"
              onChange={handleSearchQueryChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
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