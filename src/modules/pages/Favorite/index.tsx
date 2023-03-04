import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MovieCard } from "./MovieCard";
import { IAppState } from "@store/index";
import { useNavigate } from "react-router-dom";

export const Favorite = () => {
  const navigate = useNavigate();
  const movieIds = useSelector((state: IAppState) => state.favorite.movieIds);

  return (
    <Favorite.Wrapper>
      <Favorite.Container>
        <Favorite.MovieGrid>
          {movieIds.map(movieId => (
            <motion.div 
              whileHover={{ scale: 1.025 }} 
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/movie/${movieId}`)}
            >
              <MovieCard key={movieId} id={movieId} />
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