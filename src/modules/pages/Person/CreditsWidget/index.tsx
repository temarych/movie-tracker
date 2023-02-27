import { Button } from "@mui/material";
import { IGetPersonCredits } from "@typings/moviedb/responses";
import styled from "styled-components";
import { CreditCard } from "./CreditCard";

export interface CreditsWidgetProps {
  data: IGetPersonCredits;
}

export const CreditsWidget = (props: CreditsWidgetProps) => {
  return (
    <CreditsWidget.Wrapper>
      <CreditsWidget.Container>
        {props.data.cast.slice(0, 3).map(castCredit => (
          <CreditCard 
            key={castCredit.id}
            title={castCredit.title}
            subtitle={castCredit.character}
            photoPath={castCredit.poster_path}
          />
        ))}
      </CreditsWidget.Container>
      <Button size="large" fullWidth sx={{ maxWidth: "15em" }}>
        Show more
      </Button>
    </CreditsWidget.Wrapper>
  );
}

CreditsWidget.Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  width: 100%;
`;

CreditsWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
`;