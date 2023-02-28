import { Button } from "@mui/material";
import { IGetPersonCreditsResponse } from "@typings/moviedb/responses";
import styled from "styled-components";
import { CreditCard } from "./CreditCard";

export interface CreditsWidgetProps {
  data: IGetPersonCreditsResponse;
  onClick?: () => void;
}

export const CreditsWidget = (props: CreditsWidgetProps) => {
  const credits = [ ...props.data.cast, ...props.data.crew ]
    .sort((firstCredit, secondCredit) => firstCredit.popularity < secondCredit.popularity ? 1 : -1);

  return (
    <CreditsWidget.Wrapper>
      <CreditsWidget.Container>
        {credits.slice(0, 3).map(castCredit => (
          <CreditCard 
            key={castCredit.credit_id}
            title={castCredit.title}
            subtitle={"character" in castCredit ? castCredit.character : castCredit.job}
            photoPath={castCredit.poster_path}
          />
        ))}
      </CreditsWidget.Container>
      <Button 
        size="large" 
        fullWidth 
        sx={{ maxWidth: "15em" }}
        onClick={props.onClick}
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
  gap: 1.5em;
  align-items: center;
`;