import { getAvatarImagePath } from "@modules/helpers/avatars";
import { Avatar, Typography } from "@mui/material";
import styled from "styled-components";

export interface AuthorProps {
  name: string;
  username: string;
  avatarPath: string | null;
}

export const Author = (props: AuthorProps) => {
  return (
    <Author.Wrapper>
      <Avatar 
        sx={{ width: "4.5em", height: "4.5em" }} 
        src={getAvatarImagePath(props.avatarPath)}
      />
      <Author.Container>
        <Typography variant="h6" fontSize="1.4em">
          {props.name || props.username}
        </Typography>
        <Typography variant="subtitle1" marginTop="-0.25em">
          {props.name || " "}
        </Typography>
      </Author.Container>
    </Author.Wrapper>
  );
}

Author.Container = styled.div`

`;

Author.Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5em
`;