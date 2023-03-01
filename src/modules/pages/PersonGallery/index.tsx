import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { Stack, Typography } from "@mui/material";
import { useGetPersonImagesQuery, useGetPersonQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { PersonSidebar } from "../PersonCredits/PersonSidebar";
import { ImageGrid } from "../Gallery/ImageGrid";

export const PersonGallery = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);

  const isLoaded = personData && imagesData;

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  return (
    <PersonGallery.Wrapper>
      <PersonGallery.Container>
        <PersonSidebar
          name={personData.name} 
          photoPath={profilePhoto?.file_path ?? null}
          biography={personData.biography}
        />
        <Stack flex="1" gap="2.5em">
          <Stack gap="1.5em" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Link to={`/person/${id}`}>
              <BackIcon />
              Back to profile
            </Link>
          </Stack>
          <ImageGrid 
            minImageWidth="15em" 
            images={imagesData.profiles} 
          />
        </Stack>
      </PersonGallery.Container>
    </PersonGallery.Wrapper>
  );
}

PersonGallery.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

PersonGallery.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;