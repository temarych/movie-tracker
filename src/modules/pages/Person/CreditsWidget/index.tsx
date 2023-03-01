import { Button } from "@mui/material";
import { IGetPersonCreditsResponse } from "@typings/moviedb/responses";
import styled from "styled-components";
import { CreditCard } from "./CreditCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface CreditsWidgetProps {
  data: IGetPersonCreditsResponse;
  onClick?: () => void;
}

export const CreditsWidget = (props: CreditsWidgetProps) => {
  const navigate = useNavigate();

  const credits = [ ...props.data.cast, ...props.data.crew ]
    .sort((firstCredit, secondCredit) => firstCredit.popularity < secondCredit.popularity ? 1 : -1);

  return (
    <CreditsWidget.Wrapper>
      <CreditsWidget.Container>
        {credits.slice(0, 3).map(castCredit => (
          <motion.div
            whileHover={{ scale: 1.025 }}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/movie/${castCredit.id}`)}
            key={castCredit.credit_id}
          >
            <CreditCard 
              title={castCredit.title}
              subtitle={"character" in castCredit ? castCredit.character : castCredit.job}
              photoPath={castCredit.poster_path}
            />
          </motion.div>
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
  gap: 1.5em;
  width: 100%;
`;

CreditsWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  align-items: center;
`;