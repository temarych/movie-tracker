import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";
import { useGetCreditsQuery, useGetMovieQuery, useGetMovieReviewsQuery, useGetVideosQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CastWidget } from "./CastWidget";
import { Header } from "./Header";
import { Person } from "./Person";
import { Trailer } from "./Trailer";

export const Movie = () => {
  const { id } = useParams() as unknown as { id: string };

  const { data: movieData } = useGetMovieQuery(id);
  const { data: reviewsData } = useGetMovieReviewsQuery(id);
  const { data: creditsData } = useGetCreditsQuery(id);
  const { data: videosData } = useGetVideosQuery(id);

  const posterPath = movieData && movieData.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}` : null;
  const trailer = videosData?.results.find(video => video.site === "YouTube" && video.type === "Trailer") ?? null;

  return movieData && reviewsData && creditsData && videosData ? (
    <Movie.Wrapper>
      {movieData && <Header movieData={movieData} />}
      <Movie.Container>
        <Movie.Content>
          <Stack gap="1.5em" flex="1">
            {trailer && <Trailer data={trailer} />}
            <Typography variant="h4">
              About
            </Typography>
            <Typography fontSize="1.2em">
              {movieData.overview}
            </Typography>
          </Stack>
          <Stack flex="1" maxWidth="25em" alignItems="flex-start" gap="1.5em">
            <CastWidget />
          </Stack>
        </Movie.Content>
      </Movie.Container>
    </Movie.Wrapper>
  ) : null;
}

Movie.People = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
`;

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