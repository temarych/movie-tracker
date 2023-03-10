import { Avatar, Typography } from "@mui/material";
import { IGetPersonResponse } from "@typings/moviedb/responses";
import styled from "styled-components";

export interface PersonBadgeProps {
  data: IGetPersonResponse;
}

export const PersonBadge = (props: PersonBadgeProps) => {
  const posterPath = props.data.profile_path ? `https://image.tmdb.org/t/p/w500/${props.data.profile_path}` : null;

  return (
    <PersonBadge.Wrapper>
      <Avatar 
        sx={{ width: "4em", height: "4em" }} 
        src={posterPath ?? undefined} 
      />
      <PersonBadge.Container>
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
          {props.data.name}
        </Typography>
        <Typography 
          variant="subtitle1"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
            height: "1.5em"
          }}
        >
          {props.data.known_for_department}
        </Typography>
      </PersonBadge.Container>
    </PersonBadge.Wrapper>
  );
}

PersonBadge.Image = styled.img`
  min-width: 4.5em;
  height: 4.5em;
  border-radius: 1em;
  object-fit: cover;
`;

PersonBadge.Container = styled.div`
  display: flex;
  flex-direction: column;
`;

PersonBadge.Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em
`;