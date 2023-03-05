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
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: ".75em !important",
          padding: ".5em 0",
          boxShadow: "0 0 .5em rgba(0, 0, 0, 0.1) !important",
          maxHeight: "20em !important"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: ".75em"
        }
      }
    }
  }
});