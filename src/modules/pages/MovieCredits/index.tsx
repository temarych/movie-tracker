import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { useGetMovieCreditsQuery, useGetMovieQuery } from "@store/reducers/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MovieSidebar } from "../Gallery/MovieSidebar";
import { CreditCard } from "./CreditCard";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useState } from "react";
import { CreditType, TypeSelector } from "./TypeSelector";
import { motion } from "framer-motion";
import { mergeMovieCredits } from "@modules/helpers/credits";

export const MovieCredits = () => {
  const params = useParams();
  const navigate = useNavigate();

  const id = params.id as string;

  const [creditType, setCreditType] = useState<CreditType>("cast");

  const { data: movieData } = useGetMovieQuery(id);
  const { data: MovieCreditsData } = useGetMovieCreditsQuery(id);

  const isLoaded = movieData && MovieCreditsData;

  if (!isLoaded) return <Loader />;
  
  const credits = mergeMovieCredits(creditType === "cast" ? MovieCreditsData.cast : MovieCreditsData.crew);

  return (
    <MovieCredits.Wrapper>
      <MovieCredits.Container>
        <MovieSidebar movieData={movieData} />
        <MovieCredits.Content>
          <MovieCredits.Header>
            <Link to={`/movie/${id}`}>
              <BackIcon />
              Back to movie
            </Link>
            <TypeSelector
              type={creditType}
              onSelect={setCreditType}
            />
          </MovieCredits.Header>
          <MovieCredits.CreditGrid>
            {credits.map(credit => (
              <motion.div
                whileHover={{ scale: 1.025 }}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/person/${credit.id}`)}
                key={credit.id}
              >
                <CreditCard
                  title={credit.name}
                  subtitle={credit.duties.join(", ")}
                  id={credit.id}
                />
              </motion.div>
            ))}
          </MovieCredits.CreditGrid>
        </MovieCredits.Content>
      </MovieCredits.Container>
    </MovieCredits.Wrapper>
  );
}

MovieCredits.Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1.5em;
`;

MovieCredits.CreditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 1.5em;
`;

MovieCredits.Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2.5em;
`;

MovieCredits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

MovieCredits.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;