import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { Markdown } from "@modules/components/Markdown";
import { Card, Rating, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetMovieQuery, useGetReviewDetailsQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MovieSidebar } from "../../movies/MovieGallery/MovieSidebar";
import { Author } from "./Author";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { MovieBadge } from "@modules/pages/movies/MovieGallery/MovieBadge";

export const Review = () => {
  const params = useParams();
  const theme = useTheme();

  const mode = useSelector((state: IAppState) => state.config.mode);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isPocket = useMediaQuery(theme.breakpoints.down("md"));

  const id = params.id as string;

  const { data: reviewData } = useGetReviewDetailsQuery(id);
  const { data: movieData } = useGetMovieQuery(reviewData ? `${reviewData.media_id}` : "");

  const isLoaded = reviewData && movieData;

  if (!isLoaded) return <Loader />;

  const rating = reviewData.author_details.rating && reviewData.author_details.rating / 10 * 5;
  const dateFormatter = Intl.DateTimeFormat("en-EN", { dateStyle: "medium" });

  return (
    <Review.Wrapper isMobile={isMobile}>
      <Review.Container>
        {!isPocket && <MovieSidebar movieData={movieData} />}
        <Review.Content isMobile={isMobile}>
          {isPocket && <MovieBadge data={movieData} />}

          <Stack 
            gap="1.5em" 
            flexDirection="row" 
            alignItems="center" 
            justifyContent="space-between"
          >
            <Link to={`/movie/${reviewData.media_id}`}>
              <BackIcon />
              Back to movie
            </Link>
          </Stack>

          <Stack 
            gap={isMobile ? "1.5em" : "2.5em"}
            flexDirection="row" 
            alignItems="center" 
            justifyContent="space-between"
            paddingX={isMobile ? "0" : "2.5em"}
            flexWrap="wrap"
          >
            <Author 
              username={reviewData.author_details.username} 
              name={reviewData.author_details.name} 
              avatarPath={reviewData.author_details.avatar_path}
            />
            {!isMobile && (
              <Rating
                max={5}
                precision={0.5}
                value={rating}
                readOnly
                size="large"
                sx={{
                  color: mode === "dark" ? "white" : "gray",
                  "& .MuiRating-iconEmpty": {
                    color: mode === "dark" ? "white" : "gray"
                  }
                }}
              />
            )}
          </Stack>

          {isMobile && (
            <Stack
              gap="1.5em"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              paddingX="0"
            >
              <Typography variant="h6">
                Rating:
              </Typography>
              <Rating
                max={5}
                precision={0.5}
                value={rating}
                readOnly
                size="medium"
                sx={{
                  color: mode === "dark" ? "white" : "gray",
                  "& .MuiRating-iconEmpty": {
                    color: mode === "dark" ? "white" : "gray"
                  }
                }}
              />
            </Stack>
          )}

          {isMobile ? (
            <Typography variant="body1" fontSize="1.1em">
              <Markdown>
                {reviewData.content}
              </Markdown>
            </Typography>
          ) : (
            <Card 
              variant="outlined"
              sx={{
                borderRadius: "1.5em",
                padding: "2.5em"
              }}
            >
              <Typography variant="body1" fontSize="1.1em">
                <Markdown>
                  {reviewData.content}
                </Markdown>
              </Typography>
            </Card>
          )}

          <Stack paddingX={isMobile ? "0" : "2.5em"}>
            <Typography variant="subtitle1" color="GrayText" fontSize="1.1em">
              <b>Created at:</b> {dateFormatter.format(new Date(reviewData.created_at))}
            </Typography>
          </Stack>
        </Review.Content>
      </Review.Container>
    </Review.Wrapper>
  );
}

Review.Content = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ isMobile }) => isMobile ? "2em" : "2.5em"};
  flex: 1;
`;

Review.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

Review.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "2em 1em" : "2.5em"};
`;