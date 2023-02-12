import { Typography } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

export interface DetailProps {
  children: ReactNode;
  label: string;
}

export const Detail = (props: DetailProps) => {
  return (
    <Detail.Wrapper>
      <Typography variant="caption">
        {props.label}
      </Typography>
      <Typography variant="h5">
        {props.children}
      </Typography>
    </Detail.Wrapper>
  );
}

Detail.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;