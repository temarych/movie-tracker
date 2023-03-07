import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import { Route, Routes } from "react-router-dom";
import { Home } from "./modules/pages/common/Home";
import { MainLayout } from "./modules/layouts/MainLayout";
import { useSelector } from "react-redux";
import { IAppState } from "./store";
import { Favorite } from "@modules/pages/common/Favorite";
import { Movie } from "@modules/pages/movies/Movie";
import { MovieGallery } from "@modules/pages/movies/MovieGallery";
import { Person } from "@modules/pages/people/Person";
import { PersonCredits } from "@modules/pages/people/PersonCredits";
import { PersonGallery } from "@modules/pages/people/PersonGallery";
import { MovieCredits } from "@modules/pages/movies/MovieCredits";
import { Review } from "@modules/pages/reviews/Review";

export const App = () => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
    <ThemeProvider theme={createTheme(mode)}>
      <CssBaseline />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/movie/:id/credits" element={<MovieCredits />} />
          <Route path="/movie/:id/gallery" element={<MovieGallery />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/person/:id/credits" element={<PersonCredits />} />
          <Route path="/person/:id/gallery" element={<PersonGallery />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}