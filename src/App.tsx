import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./modules/pages/Home";
import { MainLayout } from "./modules/layouts/MainLayout";
import { Provider, useSelector } from "react-redux";
import { IAppState, store } from "./store";
import { Favorite } from "@modules/pages/Favorite";
import { Movie } from "@modules/pages/Movie";

export const App = () => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
    <ThemeProvider theme={createTheme(mode)}>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}