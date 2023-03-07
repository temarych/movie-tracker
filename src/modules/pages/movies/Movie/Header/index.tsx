import { IconButton, Stack, Typography } from "@mui/material";
import styled, { css } from "styled-components";
import { MovieOverall } from "../MovieOverall";
import { IGetMovieResponse } from "@typings/moviedb/responses";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { IMode } from "@store/reducers/config";
import { useCallback } from "react";
import OutlinedFavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FilledFavoriteIcon from "@mui/icons-material/Favorite";
import { 
  addMovie as addFavoriteMovieAction,
  removeMovie as removeFavoriteMovieAction
} from "@store/reducers/favorite";

export interface HeaderProps {
  movieData: IGetMovieResponse;
}

export const Header = ({ movieData }: HeaderProps) => {
  const dispatch = useDispatch();

  const mode = useSelector((state: IAppState) => state.config.mode);
  const favoriteMovieIds = useSelector((state: IAppState) => state.favorite.movieIds);

  const posterPath = movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : null;

  const addFavoriteMovie = (id: string) => dispatch(addFavoriteMovieAction(id));
  const removeFavoriteMovie = (id: string) => dispatch(removeFavoriteMovieAction(id));

  const isMovieFavorite = favoriteMovieIds.includes(movieData.id);

  const onToggleFavorite = useCallback((event: React.MouseEvent<HTMLElement>) => {

    event.stopPropagation();
    isMovieFavorite ? removeFavoriteMovie(movieData.id) : addFavoriteMovie(movieData.id);

  }, [favoriteMovieIds, movieData.id]);

  return (
    <Header.Wrapper>
      <Header.Backdrop>
        {posterPath && <Header.Image src={posterPath} />}
      </Header.Backdrop>
      <Header.Container mode={mode}>
        <Header.Content>
          {posterPath && <Header.Poster src={posterPath} />}
          <Stack height="100%" width="100%" gap="1.5em">
            <Stack flexDirection="row" flex="1" gap="3em" alignItems="flex-start" justifyContent="space-between">
              <Stack maxWidth="30em" width="100%">
                <MovieOverall data={movieData} />
              </Stack>
              <IconButton 
                sx={{ color: mode === "dark" ? "white" : "black" }} 
                onClick={onToggleFavorite}
                size="large"
              >
                {isMovieFavorite ? (
                  <FilledFavoriteIcon fontSize="large" />
                ) : (
                  <OutlinedFavoriteIcon fontSize="large" />
                )}
              </IconButton>
            </Stack>
            <Stack flexDirection="row" justifyContent="space-between" gap="3em" alignItems="flex-end">
              <Typography variant="h4" fontSize="2.5em" fontWeight="600">
                {movieData.title}
              </Typography>
              <Typography variant="h4">
                {movieData.vote_average}
              </Typography>
            </Stack>
          </Stack>
        </Header.Content>
      </Header.Container>
    </Header.Wrapper>
  );
}

Header.Space = styled.div`
  flex: 1;
`;

Header.Poster = styled.img`
  height: 100%;
  object-fit: cover;
  border-radius: 1.5em;
`;

Header.Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: blur(1em);
  transform: scale(1.1);
`;

Header.Backdrop = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

Header.Content = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 3em;
  height: 100%;
`;

Header.Container = styled.div<{
  mode: IMode;
}>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  padding: 3em;
  ${({ mode }) => mode === "dark" ? css`
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
  ` : css`
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
  `}
`;

Header.Wrapper = styled.div`
  width: 100%;
  height: 34em;
  display: flex;
  color: white;
  position: relative;
`;