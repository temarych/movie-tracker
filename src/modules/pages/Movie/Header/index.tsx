import { IconButton, Stack, Typography } from "@mui/material";
import { IGetMovieResponse } from "@store/reducers/movieApi";
import styled from "styled-components";
import { Detail } from "../MovieOverall/Detail";
import { MovieOverall } from "../MovieOverall";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";

export interface HeaderProps {
  movieData: IGetMovieResponse;
}

export const Header = ({ movieData }: HeaderProps) => {
  const posterPath = movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : null;

  return (
    <Header.Wrapper>
      <Header.Backdrop>
        {posterPath && <Header.Image src={posterPath} />}
      </Header.Backdrop>
      <Header.Container>
        <Header.Content>
          {posterPath && <Header.Poster src={posterPath} />}
          <Stack height="100%" width="100%" gap="1.5em">
            <Stack flexDirection="row" flex="1" gap="3em" alignItems="flex-start" justifyContent="space-between">
              <Stack maxWidth="30em" width="100%">
                <MovieOverall data={movieData} />
              </Stack>
              <IconButton sx={{ color: "white" }} size="large">
                <FavoriteIcon fontSize="large" />
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
  filter: blur(1em) brightness(0.5);
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

Header.Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  padding: 3em;
`;

Header.Wrapper = styled.div`
  width: 100%;
  height: 30em;
  display: flex;
  color: white;
  position: relative;
`;