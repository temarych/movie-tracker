import styled from "styled-components";
import { IMovie, useGetMoviesQuery } from "@store/reducers/movieApi";
import { MovieCard } from "../MovieCard";
import { Pagination, Stack } from "@mui/material";
import { useMemo, useRef, useState } from "react";

export interface BaseBaseMovieGridProps {
  movies: IMovie[];
}

export const BaseMovieGrid = ({ movies }: BaseBaseMovieGridProps) => {
  const maxSlotsPerPage = 20;
  const slotsPerPage = movies.length;

  const emptySlotsCount = maxSlotsPerPage - slotsPerPage;
  const emptySlots = new Array(emptySlotsCount).fill(null);

  return (
    <BaseMovieGrid.Wrapper>
      {movies.map((movie, index) => <MovieCard data={movie} key={index} />)}
      {emptySlots.map((_, index) => <div key={slotsPerPage + index} />)}
    </BaseMovieGrid.Wrapper>
  );
}

BaseMovieGrid.Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
  gap: 1em;
  > * {
    height: 20em;
  }
`;

export interface MovieGridProps {
  onPageChange: (page: number) => void;
  totalPages: number;
  movies: IMovie[];
  page: number;
}

export const MovieGrid = ({ movies, page, onPageChange, totalPages }: MovieGridProps) => {
  return (
    <MovieGrid.Wrapper>
      <BaseMovieGrid movies={movies} />
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

MovieGrid.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;