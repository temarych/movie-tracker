import { Loader } from "@modules/components/Loader";
import { debounce, Pagination, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMoviesQuery } from "@store/reducers/movieApi";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MovieCard } from "./MovieCard";
import { MovieGrid } from "./MovieGrid";
import { Search } from "./Search";

export const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data: moviesData } = useGetMoviesQuery({ page, query });

  const maxPages = 500;

  useEffect(() => setPage(1), [query])

  if (!moviesData) return <Loader />;

  const movies = moviesData.results;
  const totalPages = moviesData.total_pages > maxPages ? maxPages : moviesData.total_pages;

  return (
    <Home.Wrapper isMobile={isMobile}>
      <Home.Container>
        <Stack flex="1" gap={isMobile ? "1.5em" : "2.5em"}>
          {isPocket && (
            <Search
              onQueryChange={setQuery}
            />
          )}
          <MovieGrid 
            page={page} 
            movies={movies}
            totalPages={totalPages}
            onPageChange={page => setPage(page)}
            onOpen={id => navigate(`/movie/${id}`)}
          />
        </Stack>

        {!isPocket && (
          <Stack position="relative">
            <Home.SidebarPlaceholder />
            <Home.Sidebar>
              <Search 
                onQueryChange={setQuery}
              />
            </Home.Sidebar>
          </Stack>
        )}
      </Home.Container>
    </Home.Wrapper>
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