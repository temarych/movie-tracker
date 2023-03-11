import { Card, Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { useSelector } from "react-redux";
import styled from "styled-components";

export interface MobileCreditCardProps {
  title: string;
  subtitle: string;
  posterPath: string | null;
}

export const MobileCreditCard = (props: MobileCreditCardProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  const posterPath = props.posterPath ? `https://image.tmdb.org/t/p/w500/${props.posterPath}` : null;

  return (
    <MobileCreditCard.Wrapper variant="outlined">
      <MobileCreditCard.Image src={posterPath ?? undefined} />
      <MobileCreditCard.Container>
        <Typography 
          variant="h6" 
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            height: "1.5em"
          }}
        >
          {props.title}
        </Typography>
        <Typography 
          variant="subtitle1" 
          marginTop="-0.25em"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            height: "1.5em"
          }}
        >
          {props.subtitle}
        </Typography>
      </MobileCreditCard.Container>
    </MobileCreditCard.Wrapper>
  );
}

MobileCreditCard.Image = styled.img`
  border-radius: 1em;
  object-fit: cover;
  height: 100%;
  aspect-ratio: 1;
`;

MobileCreditCard.Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.1em;
`;

MobileCreditCard.Wrapper = styled(Card)`
  border-radius: 1.5em !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 1em;
  height: 6em;
`;