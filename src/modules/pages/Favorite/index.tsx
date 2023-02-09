import { Typography } from "@mui/material";
import styled from "styled-components";

export const Favorite = () => {
  return (
    <Favorite.Wrapper>
      <Favorite.Container>
        <Typography>
          Favorite
        </Typography>
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