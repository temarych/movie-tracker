import { Loader } from "@modules/components/Loader";
import { Stack, Typography } from "@mui/material";
import { useGetMovieImagesQuery, useGetMovieQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { MediaType, TypeSelector } from "./TypeSelector";
import { useState } from "react";
import { Link } from "./Link";

export const Gallery = () => {
  const params = useParams();
  const id = params.id as string;

  const [ mediaType, setMediaType ] = useState<MediaType>("images");

  const { data: movieData } = useGetMovieQuery(id);
  const { data: imagesData } = useGetMovieImagesQuery(id);

  const isLoaded = movieData && imagesData;

  if (!isLoaded) return <Loader />;

  return (
    <Gallery.Wrapper>
      <Gallery.Container>
        <Stack maxWidth="20em" width="100%" />
        <Stack gap="2.5em" maxWidth="20em" position="fixed">
          <Gallery.Poster src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} />
          <Typography variant="h5" fontWeight="600">
            {movieData.title}
          </Typography>
          <Typography 
            variant="body1" 
            fontSize="1.1em"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical"
            }}
          >
            {movieData.overview}
          </Typography>
        </Stack>
        <Stack flex="1" gap="2.5em">
          <Stack gap="1.5em" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Link to={`/movie/${id}`}>
              <BackIcon />
              Back to movie
            </Link>
            <TypeSelector type={mediaType} onSelect={setMediaType} />
          </Stack>
          <Gallery.ImageGrid>
            {imagesData.backdrops.map(backdrop => (
              <Gallery.Image src={`https://image.tmdb.org/t/p/w500/${backdrop.file_path}`} />
            ))}
          </Gallery.ImageGrid>
        </Stack>
      </Gallery.Container>
    </Gallery.Wrapper>
  );
}

Gallery.Poster = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  display: flex;
`;

Gallery.Image = styled.img`
  border-radius: 1em;
  width: 100%;
  object-fit: cover;
`;

Gallery.ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20em, 1fr));
  gap: 1.5em;
  width: 100%;
`;

Gallery.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2.5em;
`;

Gallery.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;