import { Avatar, AvatarGroup, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import ShowMoreIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { ActorCard } from "./ActorCard";
import { IActor, useGetCreditsQuery } from "@store/reducers/movieApi";

export interface CastWidgetProps {
  data: IActor[];
}

export const CastWidget = (props: CastWidgetProps) => {
  return (
    <CastWidget.Wrapper>
      <CastWidget.Container>
        {props.data.slice(0, 3).map(actor => (
          <ActorCard data={actor} key={actor.id} />
        ))}
      </CastWidget.Container>
      <Button size="large" fullWidth sx={{ maxWidth: "15em" }}>
        Show more
      </Button>
    </CastWidget.Wrapper>
  );
}

CastWidget.Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

CastWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  width: 100%;
`;