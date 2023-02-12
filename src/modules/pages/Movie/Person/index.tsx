import { Avatar, Card, Typography } from "@mui/material";
import { IActor } from "@store/reducers/movieApi";
import styled from "styled-components";

export interface PersonProps {
  data: IActor;
}

export const Person = (props: PersonProps) => {
  return (
    <Person.Wrapper variant="outlined">
      <Person.Image />
      <Person.Shadow />
      <Person.Container>
        <Typography variant="h6">
          {props.data.name}
        </Typography>
        <Typography variant="subtitle1">
          {props.data.character}
        </Typography>
      </Person.Container>
    </Person.Wrapper>
  );
}

Person.Image = styled.img`
  width: 100%;
  height: 100%;
`;

Person.Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent, black);
`;

Person.Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

Person.Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  gap: 1em;
  border-radius: 1em !important;
  position: relative;
  height: 16em;
  min-width: 12em;
`;