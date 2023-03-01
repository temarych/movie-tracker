import { Card, IconButton, Rating, Typography } from "@mui/material";
import styled, { css } from "styled-components";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined"
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { IMovie } from "@typings/moviedb/models";

export interface IMovieCardProps {
  data: IMovie;
  onClick?: () => void;
}

export const MovieCard = (props: IMovieCardProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  const posterPath = props.data.poster_path ? `https://image.tmdb.org/t/p/w500/${props.data.poster_path}` : null;

  return (
    <AnimatePresence>
      <motion.div whileHover={{ scale: 1.025 }} onClick={props.onClick}>
        <MovieCard.Wrapper variant="outlined">
          {posterPath && (
            <MovieCard.Poster 
              src={posterPath} 
            />
          )}
          <MovieCard.Container $color={mode === "light" ? "white" : "black"}>
            <MovieCard.Header>
              <MovieCard.Space />
              <IconButton 
                size="large"
                sx={{ 
                  color: mode === "light" ? "black" : "white",
                  backgroundColor: mode === "light" 
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(0, 0, 0, 0.5)",
                  ":hover": {
                    backgroundColor: mode === "light" 
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                  }
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </MovieCard.Header>
            <MovieCard.Space />
            <MovieCard.Info>
              <Typography 
                variant="h6" 
                fontWeight="600"
                lineHeight="1.3em"
                fontSize="1.2em"
              >
                {props.data.title}
              </Typography>
              <Rating 
                max={5} 
                precision={0.5} 
                value={props.data.vote_average / 10 * 5} 
                readOnly
                sx={{
                  color: mode === "light" ? "black" : "white",
                  fontSize: "1.3em",
                  "& .MuiRating-iconEmpty": {
                    color: mode === "light" ? "black" : "white",
                  }
                }}
              />
            </MovieCard.Info>
          </MovieCard.Container>
        </MovieCard.Wrapper>
      </motion.div>
    </AnimatePresence>
  );
}

MovieCard.Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5em;
`;

MovieCard.Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

MovieCard.Space = styled.div`
  flex: 1;
`;

MovieCard.Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

MovieCard.Container = styled.div<{
  $color: string;
}>`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.75em;
  ${({ $color }) => css`
    background: linear-gradient(360deg, ${$color}, transparent 80%);
  `}
`;

MovieCard.Wrapper = styled(Card)`
  border-radius: 1.5em !important;
  position: relative;
  user-select: none;
  cursor: pointer;
  display: flex;
  height: 100%;
  aspect-ratio: 5/7;
`;