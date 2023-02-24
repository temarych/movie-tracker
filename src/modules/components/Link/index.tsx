import { Link as MuiLink } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export interface LinkProps {
  to: string;
  children?: ReactNode;
}

export const Link = (props: LinkProps) => {
  return (
    <MuiLink 
      component={NavLink} 
      to={props.to}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1em"
      }}
    >
      {props.children}
    </MuiLink>
  );
}