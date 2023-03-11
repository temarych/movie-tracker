import { Loader } from "@modules/components/Loader";
import { Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { 
  useGetPersonCreditsQuery, 
  useGetPersonImagesQuery, 
  useGetPersonQuery 
} from "@store/reducers/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { GalleryWidget } from "../../movies/Movie/GalleryWidget";
import { CreditsWidget } from "./CreditsWidget";
import { Detail } from "./Detail";

export const Person = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const id = params.id as string;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);
  const { data: creditsData } = useGetPersonCreditsQuery(id);

  const isLoaded = personData && imagesData && creditsData;

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  return (
    <Person.Wrapper isMobile={isMobile}>
      <Person.Container isMobile={isMobile}>
        <Stack width="100%" flex="2" gap={isMobile ? "2em" : "2.5em"}>
          <Stack flexDirection="row" width="100%" gap={isMobile ? "2em" : "2.5em"} flexWrap="wrap">
            {profilePhoto && <Person.Photo src={`https://image.tmdb.org/t/p/w500/${profilePhoto.file_path}`} />}
            <Stack flex="3" justifyContent="space-between" gap={isMobile ? "2em" : "2.5em"}>
              <Person.InfoGrid>
                {personData.birthday && <Detail title={personData.birthday} subtitle="Birthday" />}
                {personData.deathday && <Detail title={personData.deathday} subtitle="Deathday" />}
                <Detail title={personData.known_for_department} subtitle="Department" />
                <Detail title={personData.popularity} subtitle="Popularity" />
              </Person.InfoGrid>
              <Typography variant="h4">
                {personData.name}
              </Typography>
            </Stack>
          </Stack>
          <Typography 
            variant="body1" 
            fontSize="1.2em"
          >
            {personData.biography}
          </Typography>
        </Stack>
        <Stack flex="1" gap={isMobile ? "2em" : "2.5em"} width="100%">
          <GalleryWidget images={imagesData.profiles} onClick={() => navigate(`/person/${id}/gallery`)} />
          <CreditsWidget data={creditsData} onClick={() => navigate(`/person/${id}/credits`)} />
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
  min-width: 18em;
  flex: 1;
  aspect-ratio: 3/4;
  object-fit: cover;
`;

Person.Container = styled.div<{
  isMobile: boolean;
}>`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: ${({ isMobile }) => isMobile ? "2em" : "2.5em"};
  position: relative;
  flex-wrap: wrap;
`;

Person.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "2em 1em" : "2.5em"};
`;