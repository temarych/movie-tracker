import { IGetMovieResponse } from "@typings/moviedb/responses";
import styled from "styled-components";
import { Detail } from "./Detail";

export interface MovieOverallProps {
  data: IGetMovieResponse;
}

export const MovieOverall = (props: MovieOverallProps) => {
  const numberFormatter = Intl.NumberFormat();
  const dateFormatter = Intl.DateTimeFormat();
  const releaseDate = new Date(props.data.release_date);

  return (
    <MovieOverall.Wrapper>
      <Detail label="Budget">
        {numberFormatter.format(props.data.budget)} $
      </Detail>
      <Detail label="Revenue">
        {numberFormatter.format(props.data.revenue)} $
      </Detail>
      <Detail label="Release date">
        {dateFormatter.format(releaseDate)}
      </Detail>
      <Detail label="Status">
        {props.data.status}
      </Detail>
      <Detail label="Genres">
        {props.data.genres.map(genre => genre.name).join(", ")}
      </Detail>
    </MovieOverall.Wrapper>
  );
}

MovieOverall.Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3em;
  width: 100%;
`;