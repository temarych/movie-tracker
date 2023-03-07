import { Loader } from "@modules/components/Loader";
import { Stack, Typography } from "@mui/material";
import { useGetMovieImagesQuery, useGetMovieQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { MediaType, TypeSelector } from "./TypeSelector";
import { useState } from "react";
import { Link } from "../../../components/Link";
import { ImageGrid } from "./ImageGrid";
import { MovieSidebar } from "./MovieSidebar";

export const MovieGallery = () => {
  const params = useParams();
  const id = params.id as string;

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
          imageDialogAspectRatio="3/4"
        />
      );
    }
  }

  return (
    <MovieGallery.Wrapper>
      <MovieGallery.Container>
        <MovieSidebar movieData={movieData} />
        <Stack flex="1" gap="2.5em">
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

MovieGallery.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;