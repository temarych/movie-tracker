import { Loader } from "@modules/components/Loader";
import { Fab, useMediaQuery, useTheme, Zoom } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMoviesQuery } from "@store/reducers/movieApi";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { MovieGrid } from "./MovieGrid";
import { Search } from "./Search";
import { useInView } from "react-intersection-observer";
import SearchIcon from "@mui/icons-material/SearchOutlined";

export const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { ref: controlsRef, inView: areControlsVisible } = useInView({ rootMargin: "-64px 0px 0px 0px" });

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          <Stack ref={controlsRef} sx={{ display: isPocket ? "flex" : "none" }}>
            <Search
              onQueryChange={setQuery}
            />
          </Stack>
          <MovieGrid 
            page={page} 
            movies={movies}
            totalPages={totalPages}
            gap={isMobile ? "1.5em" : "2.5em"}
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

        <Zoom in={isPocket && !areControlsVisible}>
          <Fab 
            color="primary"
            size="large"
            onClick={() => window.scrollTo({
              top: 0,
              behavior: "smooth"
            })}
            sx={{ 
              position: "fixed", 
              bottom: 0, 
              right: 0,
              margin: isMobile ? "1.5em" : "2.5em"
            }}
          >
            <SearchIcon />
          </Fab>
        </Zoom>
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