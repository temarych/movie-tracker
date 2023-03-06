import styled from "styled-components";
import { MovieCard } from "../MovieCard";
import { Pagination, Stack } from "@mui/material";
import { IMovie } from "@typings/moviedb/models";

export interface MovieGridProps {
  onPageChange: (page: number) => void;
  totalPages: number;
  movies: IMovie[];
  page: number;
  gap: string;
  onOpen?: (id: string) => void;
}

export const MovieGrid = ({ movies, page, onPageChange, totalPages, onOpen, gap }: MovieGridProps) => {
  return (
    <MovieGrid.Wrapper gap={gap}>
      <MovieGrid.Container>
        {movies.map(movie => (
          <MovieCard 
            data={movie} 
            key={movie.id} 
            onClick={() => onOpen && onOpen(movie.id)} 
          />
        ))}
      </MovieGrid.Container>
      <Stack flexDirection="row" alignItems="center" justifyContent="center">
        <Pagination 
          page={page} 
          count={totalPages} 
          size="large"
          siblingCount={0}
          onChange={(_, page) => onPageChange(page)} 
        />
      </Stack>
    </MovieGrid.Wrapper>
  );
}

MovieGrid.Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));
  gap: 1.5em;
`;

MovieGrid.Wrapper = styled.div<{
  gap: string;
}>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => gap};
`;