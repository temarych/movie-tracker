import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { Stack } from "@mui/material";
import { useGetPersonCreditsQuery, useGetPersonImagesQuery, useGetPersonQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PersonSidebar } from "./PersonSidebar";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { CreditCard } from "./CreditCard";
import { mergeCredits } from "@modules/helpers/credits";

export const PersonCredits = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);
  const { data: creditsData } = useGetPersonCreditsQuery(id);

  const isLoaded = personData && imagesData && creditsData;

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  const credits = mergeCredits([ ...creditsData.cast, ...creditsData.crew ])
    .sort((firstCredit, secondCredit) => firstCredit.popularity < secondCredit.popularity ? 1 : -1);

  return (
    <PersonCredits.Wrapper>
      <PersonCredits.Container>
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
          <PersonCredits.CreditGrid>
            {credits.map(credit => (
              <CreditCard 
                key={credit.credit_id}
                title={credit.title}
                subtitle={credit.duties.join(", ")}
                posterPath={credit.poster_path}
              />
            ))}
          </PersonCredits.CreditGrid>
        </Stack>
      </PersonCredits.Container>
    </PersonCredits.Wrapper>
  );
}

PersonCredits.CreditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  gap: 1.5em;
`;

PersonCredits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

PersonCredits.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;