import { IconButton } from "@mui/material";
import { IGetMovieResponse } from "@typings/moviedb/responses";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "@store/index";
import OutlinedFavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FilledFavoriteIcon from "@mui/icons-material/Favorite";
import { 
  addMovie as addFavoriteMovieAction,
  removeMovie as removeFavoriteMovieAction
} from "@store/reducers/favorite";
import { useCallback } from "react";
import { IMode } from "@store/reducers/config";

export interface PocketHeaderProps {
  movieData: IGetMovieResponse;
}

export const PocketHeader = (props: PocketHeaderProps) => {
  const dispatch = useDispatch();

  const mode = useSelector((state: IAppState) => state.config.mode);
  const favoriteMovieIds = useSelector((state: IAppState) => state.favorite.movieIds);

  const posterPath = props.movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${props.movieData.poster_path}` : null;

  const addFavoriteMovie = (id: string) => dispatch(addFavoriteMovieAction(id));
  const removeFavoriteMovie = (id: string) => dispatch(removeFavoriteMovieAction(id));

  const isMovieFavorite = favoriteMovieIds.includes(props.movieData.id);

  const onToggleFavorite = useCallback((event: React.MouseEvent<HTMLElement>) => {

    event.stopPropagation();
    isMovieFavorite ? removeFavoriteMovie(props.movieData.id) : addFavoriteMovie(props.movieData.id);

  }, [favoriteMovieIds, props.movieData.id]);

  return (
    <PocketHeader.Wrapper>
      <PocketHeader.Backdrop>
        {posterPath && <PocketHeader.Image src={posterPath} />}
        <PocketHeader.BackdropMask mode={mode} />
      </PocketHeader.Backdrop>
      <PocketHeader.Container>
        {posterPath && <PocketHeader.Poster src={posterPath} />}
        <PocketHeader.Mask>
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
            onClick={onToggleFavorite}
          >
            {isMovieFavorite ? (
              <FilledFavoriteIcon sx={{ fontSize: "1.1em" }} />
            ) : (
              <OutlinedFavoriteIcon sx={{ fontSize: "1.1em" }} />
            )}
          </IconButton>
        </PocketHeader.Mask>
      </PocketHeader.Container>
    </PocketHeader.Wrapper>
  );
}

PocketHeader.BackdropMask = styled.div<{
  mode: IMode;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ mode }) => mode === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.6)"}
`;

PocketHeader.Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 16000;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

PocketHeader.Container = styled.div`
  position: relative;
  display: flex;
  z-index: 1;
`;

PocketHeader.Poster = styled.img`
  border-radius: 1em;
  max-width: 20em;
  width: 100%;
`;

PocketHeader.Backdrop = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 3em;
`;

PocketHeader.Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: blur(1em);
  transform: scale(1.2);
`;

PocketHeader.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  padding: 3em;
  padding-bottom: 0;
`;