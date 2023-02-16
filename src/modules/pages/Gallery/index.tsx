import { Typography } from "@mui/material";
import styled from "styled-components";

export const Gallery = () => {
  return (
    <Gallery.Wrapper>
      <Gallery.Container>
        <Typography>
          Gallery
        </Typography>
      </Gallery.Container>
    </Gallery.Wrapper>
  );
}

Gallery.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  position: relative;
`;

Gallery.Wrapper = styled.div`
  display: flex;
  padding: 1.5em;
`;