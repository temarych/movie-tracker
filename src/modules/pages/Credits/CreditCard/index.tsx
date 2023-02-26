import { Card, Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { useGetPersonImagesQuery } from "@store/reducers/movieApi";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

export interface CreditCardProps {
  title: string;
  subtitle: string;
  id: string;
}

export const CreditCard = (props: CreditCardProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  const { data: imagesData } = useGetPersonImagesQuery(props.id);

  if (!imagesData) return null;

  const profilePhoto = imagesData.profiles.at(0) ?? null;
  
  return (
    <CreditCard.Wrapper variant="outlined">
      {profilePhoto && <CreditCard.Image src={`https://image.tmdb.org/t/p/w500/${profilePhoto.file_path}`} />}
      <CreditCard.Container color={mode === "light" ? "white" : "black"}>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography>
          {props.subtitle}
        </Typography>
      </CreditCard.Container>
    </CreditCard.Wrapper>
  );
}

CreditCard.Container = styled.div<{
  color: string;
}>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  ${({ color }) => css`
    background: linear-gradient(transparent 25%, ${color});
  `}
`;

CreditCard.Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

CreditCard.Wrapper = styled(Card)`
  border-radius: 1.5em !important;
  aspect-ratio: 3/4;
  position: relative;
`;