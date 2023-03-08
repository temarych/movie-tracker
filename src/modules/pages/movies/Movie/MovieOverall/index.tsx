import { IGetMovieResponse } from "@typings/moviedb/responses";
import styled from "styled-components";
import { Detail } from "./Detail";

export interface MovieOverallProps {
  data: IGetMovieResponse;
  size: "small" | "large";
}

export const MovieOverall = (props: MovieOverallProps) => {
  const numberFormatter = Intl.NumberFormat();
  const dateFormatter = Intl.DateTimeFormat();
  const releaseDate = new Date(props.data.release_date);

  return (
    <MovieOverall.Wrapper size={props.size}>
      <Detail label="Budget" size={props.size}>
        {numberFormatter.format(props.data.budget)} $
      </Detail>
      <Detail label="Revenue" size={props.size}>
        {numberFormatter.format(props.data.revenue)} $
      </Detail>
      <Detail label="Release date" size={props.size}>
        {dateFormatter.format(releaseDate)}
      </Detail>
      <Detail label="Status" size={props.size}>
        {props.data.status}
      </Detail>
    </MovieOverall.Wrapper>
  );
}

MovieOverall.Wrapper = styled.div<{
  size: "small" | "large";
}>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ size }) => size === "small" ? "1em" : "3em"};
  width: 100%;
`;