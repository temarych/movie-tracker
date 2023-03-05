import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";

export interface FiltersProps {
  filters: string[];
  selected: string[];
  onChange?: (selected: string[]) => void;
}

export const Filters = (props: FiltersProps) => {
  const handleFilterChange = useCallback((filter: string) => {
    if (!props.onChange) return;
    if (props.selected.includes(filter)) {
      const newSelectedFilters = props.selected.filter(candidate => candidate !== filter);
      props.onChange(newSelectedFilters);
      return;
    }
    props.onChange([ ...props.selected, filter ]);
  }, [props.selected]);

  return (
    <Filters.Wrapper>
      {props.filters.map(filter => (
        <ToggleButton 
          key={filter} 
          value={filter}
          selected={props.selected.includes(filter)}
          onClick={() => handleFilterChange(filter)}
        >
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