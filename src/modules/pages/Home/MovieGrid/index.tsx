import styled from "styled-components";
import { MovieCard } from "../MovieCard";
import { Pagination, Stack } from "@mui/material";
import { IMovie } from "@typings/moviedb/models";

export interface MovieGridProps {
  onPageChange: (page: number) => void;
  totalPages: number;
  movies: IMovie[];
  page: number;
  onOpen?: (id: string) => void;
}

export const MovieGrid = ({ movies, page, onPageChange, totalPages, onOpen }: MovieGridProps) => {
  const maxSlotsPerPage = 20;
  const slotsPerPage = movies.length;

  const emptySlotsCount = maxSlotsPerPage - slotsPerPage;
  const emptySlots = new Array(emptySlotsCount).fill(null);

  return (
    <MovieGrid.Wrapper>
      <MovieGrid.Container>
        {movies.map((movie, index) => <MovieCard data={movie} key={index} onClick={() => onOpen && onOpen(movie.id)} />)}
        {emptySlots.map((_, index) => <div key={slotsPerPage + index} />)}
      </MovieGrid.Container>
      <Stack flexDirection="row" alignItems="center" justifyContent="center">
        <Pagination 
          page={page} 
          count={totalPages} 
          size="large"
          onChange={(_, page) => onPageChange(page)} 
        />
      </Stack>
    </MovieGrid.Wrapper>
  );
}

MovieGrid.Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  gap: 1em;
  > * {
    height: 20em;
  }
`;

MovieGrid.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;