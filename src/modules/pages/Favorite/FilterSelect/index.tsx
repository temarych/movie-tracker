import { Checkbox, MenuItem, Select, Typography } from "@mui/material";
import { useCallback } from "react";
import styled from "styled-components";

export interface FiltersProps {
  filters: string[];
  selected: string[];
  placeholder?: string;
  onChange?: (selected: string[]) => void;
}

export const FilterSelect = (props: FiltersProps) => {
  return (
    <Select 
      multiple 
      value={props.selected}
      sx={{ minWidth: "15em", flex: 1 }}
      displayEmpty
      renderValue={selected => {
        if (!selected.length) {
          return (
            <Typography 
              variant="body1"
              color="GrayText"
            >
              {props.placeholder}
            </Typography>
          );
        };
        return (
          <Typography variant="body1">
            {selected.join(", ")}
          </Typography>
        );
      }}
      onChange={event => {
        const value = event.target.value;
        const selected = typeof value === 'string' ? value.split(',') : value;
        props.onChange && props.onChange(selected);
      }}
    >
      {props.filters.map(filter => (
        <MenuItem key={filter} value={filter} sx={{ display: "flex", gap: ".5em" }}>
          <Checkbox checked={props.selected.includes(filter)} />
          {filter}
        </MenuItem>
      ))}
    </Select>
  );
}