import { Loader } from "@modules/components/Loader";
import { Fab, Pagination, useMediaQuery, useTheme, Zoom } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMoviesQuery } from "@store/reducers/movieApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Search } from "./Search";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { MovieCard } from "./MovieCard";
import { MovieCard as ShortMovieCard } from "../Favorite/MovieCard";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  
  const { inView: areControlsVisible, ref: controlsRef } = useInView({ rootMargin: "-64px 0px 0px 0px" });
  const { inView: isPaginationVisible, ref: paginationRef } = useInView({ rootMargin: "-64px 0px 0px 0px" });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: moviesData } = useGetMoviesQuery({ page, query });

  const maxPages = 500;

  useEffect(() => setPage(1), [query]);
  useEffect(() => window.scrollTo({ top: 0 }), [page, query]);

  if (!moviesData) return <Loader />;

  const movies = moviesData.results;
  const totalPages = moviesData.total_pages > maxPages ? maxPages : moviesData.total_pages;

  const isFabVisible = !areControlsVisible && !(isMobile && isPaginationVisible);

  return (
    <React.Fragment>
      <Home.Wrapper isMobile={isMobile}>
        <Home.Container>
          <Stack flex="1" gap={isMobile ? "1.5em" : "2.5em"}>
            <Stack alignItems="center" width="100%" ref={controlsRef}>
              <Stack maxWidth="40em" width="100%">
                <Search
                  onQueryChange={setQuery}
                />
              </Stack>
            </Stack>
            {!isMobile ? (
              <Home.MovieGrid>
                {movies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    data={movie}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                ))}
              </Home.MovieGrid>
            ) : (
              <Home.MovieList>
                {movies.map(movie => (
                  <motion.div 
                    key={movie.id} 
                    whileHover={{ scale: 1.025 }}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    <ShortMovieCard
                      data={movie}
                    />
                  </motion.div>
                ))}
              </Home.MovieList>
            )}
            <Stack flexDirection="row" alignItems="center" justifyContent="center">
              <Pagination
                page={page}
                count={totalPages}
                size="large"
                ref={paginationRef}
                onChange={(_, page) => setPage(page)}
              />
            </Stack>
          </Stack>
        </Home.Container>
      </Home.Wrapper>
      <Home.FabMaskWrapper isMobile={isMobile}>
        <Home.FabMaskContainer>
          <Zoom in={isFabVisible}>
            <Fab
              color="primary"
              size="large"
              sx={{ pointerEvents: "auto" }}
              onClick={() => window.scrollTo({ 
                top: 0, 
                behavior: "smooth" 
              })}
            >
              <SearchIcon />
            </Fab>
          </Zoom>
        </Home.FabMaskContainer>
      </Home.FabMaskWrapper>
    </React.Fragment>
  );
}

Home.SidebarPlaceholder = styled.div`
  width: 20em;
`;

Home.Sidebar = styled.div`
  width: 20em;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  position: fixed;
`;

Home.MovieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

Home.MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));
  gap: 1.5em;
`;

Home.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

Home.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "1.5em" : "2.5em"};
`;

Home.FabMaskWrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "1.5em" : "2.5em"};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

Home.FabMaskContainer = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 2.5em;
  position: relative;
`;