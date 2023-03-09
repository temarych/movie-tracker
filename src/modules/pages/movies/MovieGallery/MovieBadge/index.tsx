import { Rating, Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { IMovie } from "@typings/moviedb/models";
import { useSelector } from "react-redux";
import styled from "styled-components";

export interface MovieBadgeProps {
  data: IMovie;
}

export const MovieBadge = (props: MovieBadgeProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  
  const posterPath = props.data.poster_path ? `https://image.tmdb.org/t/p/w500/${props.data.poster_path}` : null;
  const rating = props.data.vote_average / 10 * 5;

  return (
    <MovieBadge.Wrapper>
      {posterPath && <MovieBadge.Image src={posterPath} />}
      <MovieBadge.Container>
        <Typography 
          variant="h6"
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
      </MovieBadge.Container>
    </MovieBadge.Wrapper>
  );
}

MovieBadge.Image = styled.img`
  min-width: 4.5em;
  height: 4.5em;
  border-radius: 1em;
  object-fit: cover;
`;

MovieBadge.Container = styled.div`
  display: flex;
  flex-direction: column;
`;

MovieBadge.Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em
`;