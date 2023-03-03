import { Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { useSelector } from "react-redux";
import styled from "styled-components";

export const Favorite = () => {
  const movieIds = useSelector((state: IAppState) => state.favorite.movieIds);

  return (
    <Favorite.Wrapper>
      <Favorite.Container>
        <Typography>
          Favorite
        </Typography>
        {movieIds.map(movieId => (
          <Typography key={movieId}>{movieId}</Typography>
        ))}
      </Favorite.Container>
    </Favorite.Wrapper>
  );
}

Favorite.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
`;

Favorite.Wrapper = styled.div`
  display: flex;
  padding: 1em;
`;