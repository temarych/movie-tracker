import { Card, Typography } from "@mui/material";
import styled from "styled-components";

export interface CreditCardProps {
  title: string;
  subtitle: string;
  photoPath: string | null;
}

export const CreditCard = (props: CreditCardProps) => {
  return (
    <CreditCard.Wrapper variant="outlined">
      <CreditCard.Photo src={`https://image.tmdb.org/t/p/w500/${props.photoPath}`} />
      <CreditCard.Container>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography variant="subtitle1" marginTop="-0.25em">
          {props.subtitle}
        </Typography>
      </CreditCard.Container>
    </CreditCard.Wrapper>
  );
}

CreditCard.Photo = styled.img`
  border-radius: 1em;
  width: 4em;
  height: 4em;
  object-fit: cover;
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
  border-radius: 1em !important;
  padding: 1em;
`;