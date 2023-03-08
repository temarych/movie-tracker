import { Typography } from "@mui/material";
import { ReactNode } from "react";
import styled from "styled-components";

export interface DetailProps {
  children: ReactNode;
  label: string;
  size: "small" | "large";
}

export const Detail = (props: DetailProps) => {
  return (
    <Detail.Wrapper>
      <Typography variant={props.size === "small" ? "caption" : "subtitle1"}>
        {props.label}
      </Typography>
      <Typography variant={props.size === "small" ? "h6" : "h5"}>
        {props.children}
      </Typography>
    </Detail.Wrapper>
  );
}

Detail.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;