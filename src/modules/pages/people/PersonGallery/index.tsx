import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useGetPersonImagesQuery, useGetPersonQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { PersonSidebar } from "../PersonCredits/PersonSidebar";
import { ImageGrid } from "../../movies/MovieGallery/ImageGrid";
import { PersonBadge } from "./PersonBadge";

export const PersonGallery = () => {
  const params = useParams();
  const theme = useTheme();

  const id = params.id as string;

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);

  const isLoaded = personData && imagesData;

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  return (
    <PersonGallery.Wrapper isMobile={isMobile}>
      <PersonGallery.Container>
        {!isPocket && (
          <PersonSidebar
            name={personData.name} 
            photoPath={profilePhoto?.file_path ?? null}
            biography={personData.biography}
          />
        )}
        <Stack flex="1" gap={isMobile ? "2em" : "2.5em"}>
          {isPocket && <PersonBadge data={personData} />}
          <Stack gap="1.5em" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Link to={`/person/${id}`}>
              <BackIcon />
              Back to profile
            </Link>
          </Stack>
          <ImageGrid 
            minImageWidth="15em" 
            imageDialogAspectRatio="3/4"
            images={imagesData.profiles} 
            imagesGap={isMobile ? "1em" : "1.5em"}
            gap={isMobile ? "2em" : "1.5em"}
            aspectRatio={isMobile ? "16/9" : "3/4"}
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

PersonGallery.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "2em 1em" : "2.5em"};
`;