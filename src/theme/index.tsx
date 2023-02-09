import { createTheme as createMuiTheme } from "@mui/material";
import { IMode } from "@store/reducers/config";

export const createTheme = (mode: IMode) => createMuiTheme({
  palette: {
    mode
  },
  typography: {
    fontFamily: "Poppins"
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: props => ({
          "&.MuiPaper-outlined": {
            borderLeft: "none !important",
            borderRight: "none !important",
            borderTop: "none !important"
          },
          backgroundColor: props.theme.palette.background.paper,
          backdropFilter: "blur(.5em)",
          color: props.theme.palette.mode === "light" ? "black" : "white"
        })
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "4em"
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-input": {
            borderRadius: ".75em"
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: ".75em"
          }
        }
      }
    }
  }
});