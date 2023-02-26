import { Typography } from "@mui/material";
import styled from "styled-components";

export interface DetailProps {
  title: string | number;
  subtitle: string;
}

export const Detail = (props: DetailProps) => {
  return (
    <Detail.Wrapper>
      <Typography variant="h5">
        {props.title}
      </Typography>
      <Typography variant="subtitle1">
        {props.subtitle}
      </Typography>
    </Detail.Wrapper>
  );
}

Detail.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;