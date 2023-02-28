import { Avatar, Card, Typography } from "@mui/material";
import { useGetPersonImagesQuery } from "@store/reducers/movieApi";
import styled from "styled-components";

export interface CreditCardProps {
  title: string;
  subtitle: string;
  id: string;
}

export const CreditCard = (props: CreditCardProps) => {
  const { data: imagesData } = useGetPersonImagesQuery(props.id);
  const profilePhoto = imagesData?.profiles[0]?.file_path ?? null;

  return (
    <CreditCard.Wrapper variant="outlined">
      {profilePhoto ? (
        <CreditCard.Avatar src={`https://image.tmdb.org/t/p/w500/${profilePhoto}`} />
      ) : (
        <CreditCard.Avatar />
      )}
      <CreditCard.Container>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography variant="subtitle1" marginTop="-0.5em">
          {props.subtitle}
        </Typography>
      </CreditCard.Container>
    </CreditCard.Wrapper>
  );
}

CreditCard.Avatar = styled(Avatar)`
  width: 3em !important;
  height: 3em !important;
`;

CreditCard.Container = styled.div`
  display: flex;
  flex-direction: column;
`;

CreditCard.Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 1em;
  border-radius: 1em !important;
`;