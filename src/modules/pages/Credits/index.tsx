import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { IGetPersonImagesResponse, useGetCreditsQuery, useGetMovieQuery, useGetPersonImagesQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MovieSidebar } from "../Gallery/MovieSidebar";
import { CreditCard } from "./CreditCard";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";

export const Credits = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: movieData } = useGetMovieQuery(id);
  const { data: creditsData } = useGetCreditsQuery(id);

  const isLoaded = movieData && creditsData;

  if (!isLoaded) return <Loader />;

  return (
    <Credits.Wrapper>
      <Credits.Container>
        <MovieSidebar movieData={movieData} />
        <Credits.Content>
          <Credits.Header>
            <Link to={`/movie/${id}`}>
              <BackIcon />
              Back to movie
            </Link>
          </Credits.Header>
          <Credits.CreditGrid>
            {creditsData.cast.map((actor, index) => (
              <CreditCard key={index} data={actor} />
            ))}
          </Credits.CreditGrid>
        </Credits.Content>
      </Credits.Container>
    </Credits.Wrapper>
  );
}

Credits.Header = styled.div`
`;

Credits.CreditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  gap: 1.5em;
`;

Credits.Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.5em;
`;

Credits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

Credits.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;