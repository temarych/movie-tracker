import { IconButton, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { setMode as setModeAction } from "@store/reducers/config";
import { contrast } from "..";

export type IMode = "light" | "dark";

export const getModeIcon = (mode: IMode) => {
  switch (mode) {
    case "light": return <LightModeIcon />;
    default: return <DarkModeIcon />;
  }
}

export const ModeSwitch = () => {
  const theme = useTheme();
  const mode = useSelector((state: IAppState) => state.config.mode);
  const dispatch = useDispatch();

  const oppositeMode = mode === "light" ? "dark" : "light";
  const setMode = (mode: IMode) => dispatch(setModeAction(mode));

  return (
    <IconButton
      onClick={() => setMode(oppositeMode)}
      size="large"
      {...contrast(theme)}
    >
      {getModeIcon(oppositeMode)}
    </IconButton>
  );
}