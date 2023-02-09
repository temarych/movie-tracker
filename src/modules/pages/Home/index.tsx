import { debounce, Pagination, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMoviesQuery } from "@store/reducers/movieApi";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { MovieCard } from "./MovieCard";
import { MovieGrid } from "./MovieGrid";
import { Search } from "./Search";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isFetching } = useGetMoviesQuery({ page, query });

  const maxPages = 500;

  const movies = data?.results ?? [];
  const totalPages = data ? (data.total_pages > maxPages ? maxPages : data.total_pages) : 0;

  useEffect(() => setPage(1), [query])

  return (
    <Home.Wrapper>
      <Home.Container>
        <Home.Content>
          <MovieGrid 
            page={page} 
            movies={movies}
            totalPages={totalPages}
            onPageChange={page => setPage(page)}
          />
        </Home.Content>

        <Stack position="relative">
          <Home.SidebarPlaceholder />
          <Home.Sidebar>
            <Search 
              onQueryChange={setQuery}
            />
          </Home.Sidebar>
        </Stack>
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

Home.Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  flex: 1;
`;

Home.MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  > * {
    height: 20em;
  }
  gap: 1.5em;
`;

Home.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  position: relative;
`;

Home.Wrapper = styled.div`
  display: flex;
  padding: 1.5em;
`;