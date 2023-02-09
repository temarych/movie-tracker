import { debounce, Pagination, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMoviesQuery } from "@store/reducers/movieApi";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { MovieCard } from "./MovieCard";

export const Home = () => {
  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const { data } = useGetMoviesQuery({ page, query });

  const totalPages = data && (data.total_pages > 500 ? 500 : data.total_pages);
  const emptySlots = data ? (20 - data.results.length) : 20;

  const setQueryDebounced = useMemo(() => debounce(setQuery, 100), []);

  useEffect(() => {
    setQueryDebounced(searchValue);
  }, [searchValue]);

  return (
    <Home.Wrapper>
      <Home.Container>
        <Home.Content>
          <Home.MovieGrid>
            {data?.results.slice(0, 20).map((movie, index) => (
              <MovieCard data={movie} key={index} />
            ))}
            {new Array(emptySlots).fill(null).map((_, index) => (
              <div key={index} />
            ))}
          </Home.MovieGrid>
          <Stack flexDirection="row" justifyContent="center" alignItems="center">
            <Pagination 
              page={page} 
              onChange={(_, page) => setPage(page)} 
              count={totalPages} 
              size="large"
            />
          </Stack>
        </Home.Content>

        <Home.Sidebar>
          <TextField 
            fullWidth 
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
          />
        </Home.Sidebar>
      </Home.Container>
    </Home.Wrapper>
  );
}

Home.Sidebar = styled.div`
  width: 20em;
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
`;

Home.Wrapper = styled.div`
  display: flex;
  padding: 1.5em;
`;