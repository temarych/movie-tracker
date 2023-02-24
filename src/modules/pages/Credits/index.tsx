import { Loader } from "@modules/components/Loader";
import { useGetMovieImagesQuery, useGetMovieQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MovieSidebar } from "../Gallery/MovieSidebar";

export const Credits = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: movieData } = useGetMovieQuery(id);

  const isLoaded = movieData;

  if (!isLoaded) return <Loader />;

  return (
    <Credits.Wrapper>
      <Credits.Container>
        <MovieSidebar movieData={movieData} />
      </Credits.Container>
    </Credits.Wrapper>
  );
}

Credits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  position: relative;
`;

Credits.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;