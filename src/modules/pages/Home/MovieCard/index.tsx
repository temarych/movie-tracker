import { Card, IconButton, Rating, Typography } from "@mui/material";
import styled, { css } from "styled-components";
import OutlinedFavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FilledFavoriteIcon from "@mui/icons-material/Favorite";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { IMovie } from "@typings/moviedb/models";
import { 
  addMovie as addFavoriteMovieAction,
  removeMovie as removeFavoriteMovieAction
} from "@store/reducers/favorite";
import { useCallback } from "react";

export interface IMovieCardProps {
  data: IMovie;
}

export const MovieCard = (props: IMovieCardProps) => {
  const dispatch = useDispatch();

  const mode = useSelector((state: IAppState) => state.config.mode);
  const favoriteMovieIds = useSelector((state: IAppState) => state.favorite.movieIds);

  const posterPath = props.data.poster_path ? `https://image.tmdb.org/t/p/w500/${props.data.poster_path}` : null;

  const addFavoriteMovie = (id: string) => dispatch(addFavoriteMovieAction(id));
  const removeFavoriteMovie = (id: string) => dispatch(removeFavoriteMovieAction(id));

  const isMovieFavorite = favoriteMovieIds.includes(props.data.id);

  const onToggleFavorite = useCallback((event: React.MouseEvent<HTMLElement>) => {

    event.stopPropagation();
    isMovieFavorite ? removeFavoriteMovie(props.data.id) : addFavoriteMovie(props.data.id);

  }, [favoriteMovieIds, props.data.id]);

  return (
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
            onClick={onToggleFavorite}
            sx={{
              color: mode === "light" ? "black" : "white",
              fontSize: "3em",
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
            {isMovieFavorite ? (
              <FilledFavoriteIcon sx={{ fontSize: "0.6em" }} />
            ) : (
              <OutlinedFavoriteIcon sx={{ fontSize: "0.6em" }} />
            )}
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
  );
}

MovieCard.Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
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