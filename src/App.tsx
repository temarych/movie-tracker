import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import { Route, Routes } from "react-router-dom";
import { Home } from "./modules/pages/Home";
import { MainLayout } from "./modules/layouts/MainLayout";
import { useSelector } from "react-redux";
import { IAppState } from "./store";
import { Favorite } from "@modules/pages/Favorite";
import { Movie } from "@modules/pages/Movie";
import { Gallery } from "@modules/pages/Gallery";

export const App = () => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
    <ThemeProvider theme={createTheme(mode)}>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movie/:id/gallery" element={<Gallery />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}