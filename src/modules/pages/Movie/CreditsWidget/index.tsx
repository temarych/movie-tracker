import { Button } from "@mui/material";
import styled from "styled-components";
import { ActorCard } from "./ActorCard";
import { useNavigate, useParams } from "react-router-dom";
import { IActor } from "@typings/moviedb/models";

export interface CreditsWidgetProps {
  data: IActor[];
}

export const CreditsWidget = (props: CreditsWidgetProps) => {
  const params = useParams();
  const id = params.id as string;
  const navigate = useNavigate();

  return (
    <CreditsWidget.Wrapper>
      <CreditsWidget.Container>
        {props.data.slice(0, 3).map(actor => (
          <ActorCard data={actor} key={actor.id} />
        ))}
      </CreditsWidget.Container>
      <Button 
        size="large" 
        fullWidth sx={{ maxWidth: "15em" }}
        onClick={() => navigate(`/movie/${id}/credits`, { preventScrollReset: false })}
      >
        Show more
      </Button>
    </CreditsWidget.Wrapper>
  );
}

CreditsWidget.Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

CreditsWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  width: 100%;
`;