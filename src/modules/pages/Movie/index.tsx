import { Stack, Typography } from "@mui/material";
import { useGetMovieQuery, useGetMovieReviewsQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Header } from "./Header";

export const Movie = () => {
  const { id } = useParams() as unknown as { id: string };

  const { data: movieData } = useGetMovieQuery(id);
  const { data: reviewsData } = useGetMovieReviewsQuery(id);

  const posterPath = movieData && movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : null;

  return movieData && reviewsData ? (
    <Movie.Wrapper>
      {movieData && <Header movieData={movieData} />}
      <Movie.Container>
        <Movie.Content>
          <Stack gap="1em" flex="1">
            <Typography variant="h4">
              About
            </Typography>
            <Typography>
              {movieData.overview}
            </Typography>
          </Stack>
          <Stack flex="1">
            <Typography variant="h4">
              Cast
            </Typography>
          </Stack>
        </Movie.Content>
      </Movie.Container>
    </Movie.Wrapper>
  ) : null;
}

Movie.Content = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 3em;
`;

Movie.Container = styled.div`
  width: 100%;
  padding: 3em;
`;

Movie.Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;