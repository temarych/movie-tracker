import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/SearchOutlined";

export interface SearchProps {
  onQueryChange: (query: string) => void;
}

export const Search = ({ onQueryChange }: SearchProps) => {
  const [value, setValue] = useState("");

  const setQueryDebounced = useMemo(() => debounce((query: string) => onQueryChange(query), 100), []);

  useEffect(() => {
    setQueryDebounced(value);
  }, [value]);

  return (
    <TextField 
      value={value}
      onChange={event => setValue(event.target.value)}
      placeholder="Search"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
      }}
    />
  );
}