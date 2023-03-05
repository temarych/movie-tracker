import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styled from "styled-components";

export interface FiltersProps {
  filters: string[];
}

export const Filters = (props: FiltersProps) => {
  return (
    <Filters.Wrapper>
      {props.filters.map(filter => (
        <ToggleButton value={filter}>
          {filter}
        </ToggleButton>
      ))}
    </Filters.Wrapper>
  );
}

Filters.Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  gap: 1em;
`;