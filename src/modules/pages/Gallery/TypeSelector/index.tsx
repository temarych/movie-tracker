import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styled from "styled-components";

export type MediaType = "images" | "poster" | "videos";

export interface TypeSelectorProps {
  type: string;
  onSelect: (type: MediaType) => void;
}

export const TypeSelector = (props: TypeSelectorProps) => {
  return (
    <TypeSelector.ToggleButtonGroup 
      onChange={(_, type) => props.onSelect(type)}
      value={props.type}
      exclusive
    >
      <ToggleButton value="images">
        Images
      </ToggleButton>
      <ToggleButton value="posters">
        Posters
      </ToggleButton>
      <ToggleButton value="videos">
        Videos
      </ToggleButton>
    </TypeSelector.ToggleButtonGroup>
  );
}

TypeSelector.ToggleButtonGroup = styled(ToggleButtonGroup)`
  
`;