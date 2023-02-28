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
import { Credits } from "@modules/pages/Credits";
import { Person } from "@modules/pages/Person";
import { PersonCredits } from "@modules/pages/PersonCredits";
import { PersonGallery } from "@modules/pages/PersonGallery";

export const App = () => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
    <ThemeProvider theme={createTheme(mode)}>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movie/:id/credits" element={<Credits />} />
          <Route path="/movie/:id/gallery" element={<Gallery />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/person/:id/credits" element={<PersonCredits />} />
          <Route path="/person/:id/gallery" element={<PersonGallery />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}