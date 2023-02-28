import { Loader } from "@modules/components/Loader";
import { mergeMovieCredits } from "@modules/helpers/credits";
import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";
import { useGetMovieCreditsQuery, useGetMovieImagesQuery, useGetMovieQuery, useGetMovieReviewsQuery, useGetVideosQuery } from "@store/reducers/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CreditsWidget } from "./CreditsWidget";
import { GalleryWidget } from "./GalleryWidget";
import { Header } from "./Header";
import { ReviewsWidget } from "./ReviewsWidget";
import { Trailer } from "./Trailer";

export const Movie = () => {
  const navigate = useNavigate();
  const { id } = useParams() as unknown as { id: string };

  const { data: movieData } = useGetMovieQuery(id);
  const { data: reviewsData } = useGetMovieReviewsQuery(id);
  const { data: creditsData } = useGetMovieCreditsQuery(id);
  const { data: videosData } = useGetVideosQuery(id);
  const { data: imagesData } = useGetMovieImagesQuery(id);

  const trailer = videosData?.results.find(video => video.site === "YouTube" && video.type === "Trailer") ?? null;
  const areLoaded = movieData && reviewsData && creditsData && videosData && imagesData;

  if (!areLoaded) return <Loader />;

  const credits = mergeMovieCredits([ ...creditsData.cast, ...creditsData.crew ]);

  return (
    <Movie.Wrapper>
      {movieData && <Header movieData={movieData} />}
      <Movie.Container>
        <Movie.Content>
          <Stack gap="3em" flexDirection="row">
            <Stack gap="3em" flex="1">
              {trailer && <Trailer data={trailer} />}
              <Stack gap="1.5em">
                <Typography variant="h4">
                  About
                </Typography>
                <Typography fontSize="1.2em">
                  {movieData.overview}
                </Typography>
              </Stack>
            </Stack>
            <Stack flex="1" maxWidth="25em" alignItems="flex-start" gap="3em">
              <GalleryWidget 
                images={imagesData.backdrops}
                onClick={() => navigate(`/movie/${id}/gallery`)}
              />
              <CreditsWidget data={credits} />
            </Stack>
          </Stack>
          <ReviewsWidget reviews={reviewsData.results} />
        </Movie.Content>
      </Movie.Container>
    </Movie.Wrapper>
  );
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
  flex-direction: column;
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