import { Card, Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

export interface CreditCardProps {
  title: string;
  subtitle: string;
  posterPath: string | null;
}

export const CreditCard = (props: CreditCardProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
    <CreditCard.Wrapper variant="outlined">
      {props.posterPath && <CreditCard.Image src={`https://image.tmdb.org/t/p/w500/${props.posterPath}`} />}
      <CreditCard.Container $color={mode === "light" ? "white" : "black"}>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography variant="subtitle1">
          {props.subtitle}
        </Typography>
      </CreditCard.Container>
    </CreditCard.Wrapper>
  );
}

CreditCard.Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

CreditCard.Container = styled.div<{
  $color: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1.5em;
  ${({ $color }) => css`
    background: linear-gradient(transparent 20%, ${$color});
  `}
`;

CreditCard.Wrapper = styled(Card)`
  border-radius: 1.5em !important;
  aspect-ratio: 3/4;
  position: relative;
`;