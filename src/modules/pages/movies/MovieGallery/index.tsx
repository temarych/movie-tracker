import { Loader } from "@modules/components/Loader";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetMovieImagesQuery, useGetMovieQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { MediaType, TypeSelector } from "./TypeSelector";
import { useState } from "react";
import { Link } from "../../../components/Link";
import { ImageGrid } from "./ImageGrid";
import { MovieSidebar } from "./MovieSidebar";
import { MovieBadge } from "./MovieBadge";

export const MovieGallery = () => {
  const params = useParams();
  const theme = useTheme();

  const id = params.id as string;

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [ mediaType, setMediaType ] = useState<MediaType>("images");

  const { data: movieData } = useGetMovieQuery(id);
  const { data: imagesData } = useGetMovieImagesQuery(id);

  const isLoaded = movieData && imagesData;

  if (!isLoaded) return <Loader />;

  const getGrid = (type: MediaType) => {
    switch (type) {
      case "images": return (
        <ImageGrid
          images={imagesData.backdrops} 
          minImageWidth="20em"
          imageDialogAspectRatio="16/9"
        />
      );
      case "posters": return (
        <ImageGrid
          images={imagesData.posters} 
          minImageWidth="15em"
          aspectRatio={isMobile ? "16/9" : "3/4"}
          imageDialogAspectRatio="3/4"
        />
      );
    }
  }

  return (
    <MovieGallery.Wrapper isMobile={isMobile}>
      <MovieGallery.Container>
        {!isPocket && <MovieSidebar movieData={movieData} />}
        <Stack flex="1" gap={isMobile ? "2em" : "2.5em"}>
          {isPocket && <MovieBadge data={movieData} />}
          <Stack gap="1.5em" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Link to={`/movie/${id}`}>
              <BackIcon />
              Back to movie
            </Link>
            <TypeSelector type={mediaType} onSelect={setMediaType} />
          </Stack>
          {getGrid(mediaType)}
        </Stack>
      </MovieGallery.Container>
    </MovieGallery.Wrapper>
  );
}

MovieGallery.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.5em;
`;

MovieGallery.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "2em 1em" : "2.5em"};
`;