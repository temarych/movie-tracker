import { Button } from "@mui/material";
import styled from "styled-components";
import { CreditCard } from "./CreditCard";
import { useNavigate, useParams } from "react-router-dom";
import { IMergedMovieCredit } from "@typings/moviedb/models";
import { motion } from "framer-motion";

export interface CreditsWidgetProps {
  data: IMergedMovieCredit[];
}

export const CreditsWidget = (props: CreditsWidgetProps) => {
  const params = useParams();
  const id = params.id as string;
  const navigate = useNavigate();

  return (
    <CreditsWidget.Wrapper>
      <CreditsWidget.Container>
        {props.data.slice(0, 3).map(credit => (
          <motion.div 
            whileHover={{ scale: 1.025 }}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/person/${credit.id}`)}
            key={credit.id}
          >
            <CreditCard 
              title={credit.name}
              subtitle={credit.duties.join(", ")}
              id={credit.id}
            />
          </motion.div>
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
  gap: 1.5em;
  width: 100%;
`;

CreditsWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5em;
  width: 100%;
`;