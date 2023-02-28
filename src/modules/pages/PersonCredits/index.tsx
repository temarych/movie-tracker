import { Loader } from "@modules/components/Loader";
import { Typography } from "@mui/material";
import { useGetPersonImagesQuery, useGetPersonQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PersonSidebar } from "./PersonSidebar";

export const PersonCredits = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);

  const isLoaded = personData && imagesData;

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  return (
    <PersonCredits.Wrapper>
      <PersonCredits.Container>
        <PersonSidebar 
          name={personData.name} 
          photoPath={profilePhoto?.file_path ?? null}
        />
        <Typography>
          Person credits
        </Typography>
      </PersonCredits.Container>
    </PersonCredits.Wrapper>
  );
}

PersonCredits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 3em;
  position: relative;
`;

PersonCredits.Wrapper = styled.div`
  display: flex;
  padding: 3em;
`;