import { Divider, Drawer, FormControlLabel, IconButton, InputLabel, Stack, Switch, Typography } from "@mui/material";
import { Search } from "../Search";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export interface SearchDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  onQueryChange?: (query: string) => void;
  initialQuery?: string;
}

export const SearchDrawer = (props: SearchDrawerProps) => {
  return (
    <Drawer
      open={props.isOpen}
      onClose={props.onClose}
      anchor="bottom"
      sx={{
        "& .MuiPaper-root": {
          borderTopLeftRadius: "1em",
          borderTopRightRadius: "1em",
          display: "flex",
          flexDirection: "column"
        }
      }}
    >
      <Stack 
        flexDirection="row" 
        alignItems="center" 
        justifyContent="space-between"
        padding="1em"
      >
        <Typography variant="h6" marginLeft="0.5em">
          Search movies
        </Typography>
        <IconButton size="large" onClick={props.onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Stack gap="1.5em" padding="2em 1.25em">
        <Stack flexDirection="row" flexWrap="wrap" gap="1em">
          <Stack minWidth="15em" flex="2">
            <Search
              onQueryChange={props.onQueryChange}
              initialQuery={props.initialQuery}
            />
          </Stack>
          <Stack minWidth="15em" flex="1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker views={["year"]} label="Release year" />
            </LocalizationProvider>
          </Stack>
        </Stack>
        <FormControlLabel 
          control={<Switch />}
          label="Include adult content"
          labelPlacement="end"
          sx={{ marginLeft: "-0.1em", gap: "0.5em" }}
        />
      </Stack>
    </Drawer>
  );
}