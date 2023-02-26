import { Loader } from "@modules/components/Loader";
import { Grid, Stack, Typography } from "@mui/material";
import { useGetPersonImagesQuery, useGetPersonQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GalleryWidget } from "../Movie/GalleryWidget";
import { Detail } from "./Detail";

export const Person = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);

  const isLoaded = personData && imagesData;

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  return (
    <Person.Wrapper>
      <Person.Container>
        <Stack flex="2" minWidth="15em">
          {profilePhoto && <Person.Photo src={`https://image.tmdb.org/t/p/original/${profilePhoto.file_path}`} />}
        </Stack>
        <Stack gap="2.5em" flex="3" minWidth="15em">
          <Person.InfoGrid>
            {personData.birthday && <Detail title={personData.birthday} subtitle="Birthday" />}
            {personData.deathday && <Detail title={personData.deathday} subtitle="Deathday" />}
            <Detail title={personData.known_for_department} subtitle="Department" />
            <Detail title={personData.popularity} subtitle="Popularity" />
          </Person.InfoGrid>
          <Typography variant="h4">
            {personData.name}
          </Typography>
          <Typography 
            variant="body1" 
            fontSize="1.1em"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: "6",
              WebkitBoxOrient: "vertical"
            }}
          >
            {personData.biography}
          </Typography>
        </Stack>
        <Stack flex="1">
          <GalleryWidget images={imagesData.profiles} />
        </Stack>
      </Person.Container>
    </Person.Wrapper>
  );
}

Person.InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  width: 100%;
  gap: 1.5em;
`;

Person.Photo = styled.img`
  border-radius: 1.5em;
  width: 100%;
`;

Person.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 3em;
  position: relative;
  flex-wrap: wrap;
`;

Person.Wrapper = styled.div`
  display: flex;
  padding: 3em;
`;