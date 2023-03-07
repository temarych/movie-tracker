import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import SearchIcon from "@mui/icons-material/SearchOutlined";

export interface SearchProps {
  onQueryChange?: (query: string) => void;
  initialQuery?: string;
}

export const Search = ({ onQueryChange, initialQuery = "" }: SearchProps) => {
  const [value, setValue] = useState(initialQuery);

  const setQueryDebounced = useMemo(() => debounce((query: string) => {
    onQueryChange && onQueryChange(query);
  }, 200), []);

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