import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styled from "styled-components";

export type CreditType = "cast" | "crew";

export interface TypeSelectorProps {
  type: string;
  onSelect: (type: CreditType) => void;
}

export const TypeSelector = (props: TypeSelectorProps) => {
  return (
    <TypeSelector.ToggleButtonGroup 
      onChange={(_, type) => props.onSelect(type)}
      value={props.type}
      exclusive
    >
      <ToggleButton value="cast">
        Cast
      </ToggleButton>
      <ToggleButton value="crew">
        Crew
      </ToggleButton>
    </TypeSelector.ToggleButtonGroup>
  );
}

TypeSelector.ToggleButtonGroup = styled(ToggleButtonGroup)`
  
`;