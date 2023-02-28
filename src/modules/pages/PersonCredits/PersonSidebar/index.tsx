import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

export interface PersonSidebarProps {
  name: string;
  photoPath: string | null;
}

export const PersonSidebar = (props: PersonSidebarProps) => {
  return (
    <React.Fragment>
      <PersonSidebar.Placeholder />
      <PersonSidebar.Wrapper>
        {props.photoPath && <PersonSidebar.Photo src={`https://image.tmdb.org/t/p/w500/${props.photoPath}`} />}
        <Typography variant="h4">
          {props.name}
        </Typography>
      </PersonSidebar.Wrapper>
    </React.Fragment>
  );
}

PersonSidebar.Placeholder = styled.div`
  max-width: 20em;
  width: 100%;
`;

PersonSidebar.Photo = styled.img`
  border-radius: 1.5em;
  width: 100%;
`;

PersonSidebar.Wrapper = styled.div`
  max-width: 20em;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
`;