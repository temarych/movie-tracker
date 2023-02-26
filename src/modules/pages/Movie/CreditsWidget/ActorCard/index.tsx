import { Avatar, Card, Typography } from "@mui/material";
import { useGetPersonImagesQuery } from "@store/reducers/movieApi";
import { IActor } from "@typings/moviedb/models";
import styled from "styled-components";

export interface ActorCardProps {
  data: IActor;
}

export const ActorCard = (props: ActorCardProps) => {
  const { data: imagesData } = useGetPersonImagesQuery(props.data.id);
  const profilePhoto = imagesData?.profiles[0]?.file_path ?? null;

  return (
    <ActorCard.Wrapper variant="outlined">
      {profilePhoto ? (
        <ActorCard.Avatar src={`https://image.tmdb.org/t/p/w500/${profilePhoto}`} />
      ) : (
        <ActorCard.Avatar />
      )}
      <ActorCard.Container>
        <Typography variant="h6">
          {props.data.name}
        </Typography>
        <Typography variant="subtitle1" marginTop="-0.5em">
          {props.data.character}
        </Typography>
      </ActorCard.Container>
    </ActorCard.Wrapper>
  );
}

ActorCard.Avatar = styled(Avatar)`
  width: 3em !important;
  height: 3em !important;
`;

ActorCard.Container = styled.div`
  display: flex;
  flex-direction: column;
`;

ActorCard.Wrapper = styled(Card)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  padding: 1em;
  border-radius: 1em !important;
`;