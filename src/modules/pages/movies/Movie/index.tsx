import { Loader } from "@modules/components/Loader";
import { mergeMovieCredits } from "@utils/helpers/credits";
import { Avatar, AvatarGroup, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { 
  useGetMovieCreditsQuery, 
  useGetMovieImagesQuery, 
  useGetMovieQuery, 
  useGetMovieReviewsQuery, 
  useGetVideosQuery 
} from "@store/reducers/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { CreditsWidget } from "./CreditsWidget";
import { GalleryWidget } from "./GalleryWidget";
import { Header } from "./Header";
import { ReviewsWidget } from "./ReviewsWidget";
import { Trailer } from "./Trailer";
import { PocketHeader } from "./PocketHeader";
import { MovieOverall } from "./MovieOverall";

export const Movie = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const params = useParams();

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const id = params.id as string;

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
      {isPocket ? (
        <PocketHeader movieData={movieData} />
      ) : (
        <Header movieData={movieData} />
      )}
      <Movie.Container isMobile={isMobile}>
        <Movie.Content isMobile={isMobile}>
          {isPocket && (
            <Stack gap="3em">
              <Typography 
                variant="h4"
                fontWeight="600" 
                textAlign="center"
                fontSize={isMobile ? "1.75em" : "2em"}
              >
                {movieData.title}
              </Typography>
              <MovieOverall data={movieData} size={isMobile ? "small" : "large"} />
            </Stack>
          )}
          <Stack gap="3em" flexDirection="row" flexWrap="wrap">
            <Stack gap="3em" flex="2" minWidth="20em">
              {trailer && <Trailer data={trailer} />}
              <Stack gap="1.5em">
                <Typography variant="h4" fontSize="1.75em">
                  About
                </Typography>
                <Typography fontSize="1.2em">
                  {movieData.overview}
                </Typography>
              </Stack>
            </Stack>
            <Stack flex="1" minWidth="20em" alignItems="flex-start" gap="3em">
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

Movie.Content = styled.div<{
  isMobile: boolean;
}>`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3em;
`;

Movie.Container = styled.div<{
  isMobile: boolean;
}>`
  width: 100%;
  padding: ${({ isMobile }) => isMobile ? "3em 1em" : "3em"};
`;

Movie.Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;