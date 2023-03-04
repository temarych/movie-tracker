import { Card, IconButton, Rating, Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { removeMovie as removeFavoriteMovieAction } from "@store/reducers/favorite";
import { IGetMovieResponse } from "@typings/moviedb/responses";

export interface MovieCardProps {
  data: IGetMovieResponse;
}

export const MovieCard = (props: MovieCardProps) => {
  const dispatch = useDispatch();

  const mode = useSelector((state: IAppState) => state.config.mode);

  const posterPath = props.data.poster_path ? `https://image.tmdb.org/t/p/w500/${props.data.poster_path}` : null;
  const rating = props.data.vote_average / 10 * 5;

  const removeMovie = (id: string) => dispatch(removeFavoriteMovieAction(id));

  return (
    <MovieCard.Wrapper variant="outlined">
      <MovieCard.Image src={posterPath ?? undefined} />
      <MovieCard.Container>
        <Typography 
          variant="h6" 
          fontSize="1.2em"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            height: "1.5em"
          }}
        >
          {props.data.title}
        </Typography>
        <Rating
          max={5}
          precision={0.5}
          value={rating}
          readOnly
          size="small"
          sx={{
            color: mode === "light" ? "black" : "white",
            "& .MuiRating-iconEmpty": {
              color: mode === "light" ? "black" : "white",
            }
          }}
        />
      </MovieCard.Container>
      <IconButton 
        size="large" 
        sx={{ color: mode === "light" ? "black" : "white" }}
        onClick={event => {
          event.stopPropagation();
          removeMovie(props.data.id);
        }}
      >
        <FavoriteIcon sx={{ fontSize: "0.9em" }} />
      </IconButton>
    </MovieCard.Wrapper>
  );
}

MovieCard.Image = styled.img`
  border-radius: 1em;
  object-fit: cover;
  height: 100%;
  aspect-ratio: 1;
`;

MovieCard.Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.1em;
`;

MovieCard.Wrapper = styled(Card)`
  border-radius: 1.5em !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 1em;
  height: 6em;
`;