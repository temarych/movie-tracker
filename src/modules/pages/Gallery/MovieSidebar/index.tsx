import { Stack, Typography } from "@mui/material";
import { IGetMovieResponse } from "@typings/moviedb/responses";
import React from "react";
import styled from "styled-components";

export interface MovieSidebarProps {
  movieData: IGetMovieResponse;
}

export const MovieSidebar = (props: MovieSidebarProps) => {
  return (
    <React.Fragment>
      <Stack maxWidth="20em" width="100%" />
      <Stack gap="2.5em" maxWidth="20em" position="fixed">
        <MovieSidebar.Poster src={`https://image.tmdb.org/t/p/w500/${props.movieData.poster_path}`} />
        <Typography variant="h5" fontWeight="600">
          {props.movieData.title}
        </Typography>
        <Typography
          variant="body1"
          fontSize="1.1em"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical"
          }}
        >
          {props.movieData.overview}
        </Typography>
      </Stack>
    </React.Fragment>
  );
}

MovieSidebar.Poster = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 1.5em;
  display: flex;
`;