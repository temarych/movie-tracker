import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { useGetMovieCreditsQuery, useGetMovieQuery } from "@store/reducers/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { MovieSidebar } from "../MovieGallery/MovieSidebar";
import { CreditCard } from "./CreditCard";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { useEffect, useState } from "react";
import { CreditType, TypeSelector } from "./TypeSelector";
import { motion } from "framer-motion";
import { mergeMovieCredits } from "@utils/helpers/credits";
import { Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";
import { MovieBadge } from "../MovieGallery/MovieBadge";
import { CreditCard as MobileCreditCard } from "@modules/pages/movies/Movie/CreditsWidget/CreditCard";

export const MovieCredits = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const id = params.id as string;
  const maxCreditsPerPage = 20;

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isPocket = useMediaQuery(theme.breakpoints.down("md"));

  const [creditType, setCreditType] = useState<CreditType>("cast");
  const [page, setPage] = useState<number>(1);

  const { data: movieData } = useGetMovieQuery(id);
  const { data: MovieCreditsData } = useGetMovieCreditsQuery(id);

  const isLoaded = movieData && MovieCreditsData;

  useEffect(() => window.scrollTo({ top: 0 }), [page]);
  useEffect(() => setPage(1), [creditType]);

  if (!isLoaded) return <Loader />;
  
  const credits = mergeMovieCredits(creditType === "cast" ? MovieCreditsData.cast : MovieCreditsData.crew);
  const currentPageCredits = credits.slice((page - 1) * maxCreditsPerPage, page * maxCreditsPerPage);
  const pagesCount = Math.ceil(credits.length / maxCreditsPerPage);

  return (
    <MovieCredits.Wrapper isMobile={isMobile}>
      <MovieCredits.Container isMobile={isMobile}>
        {!isPocket && <MovieSidebar movieData={movieData} />}
        <MovieCredits.Content isMobile={isMobile}>
          {isPocket && <MovieBadge data={movieData} />}
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
          <Stack gap={isMobile ? "2em" : "1.5em"}>
            {isMobile ? (
              <MovieCredits.CreditList>
                {currentPageCredits.map(credit => (
                  <motion.div
                    whileHover={{ scale: 1.025 }}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/person/${credit.id}`)}
                    key={credit.id}
                  >
                    <MobileCreditCard
                      title={credit.name}
                      subtitle={credit.duties.join(", ")}
                      id={credit.id}
                    />
                  </motion.div>
                ))}
              </MovieCredits.CreditList>
            ) : (
              <MovieCredits.CreditGrid>
                {currentPageCredits.map(credit => (
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
            )}
            <Stack alignItems="center">
              <Pagination 
                page={page}
                count={pagesCount}
                size={isMobile ? "small" : "large"}
                onChange={(_, page) => setPage(page)}
              />
            </Stack>
          </Stack>
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

MovieCredits.CreditList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

MovieCredits.CreditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 1.5em;
`;

MovieCredits.Content = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ isMobile }) => isMobile ? "2em" : "2.5em"};
`;

MovieCredits.Container = styled.div<{
  isMobile: boolean;
}>`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: ${({ isMobile  }) => isMobile ? "2em" : "2.5em"};
  position: relative;
`;

MovieCredits.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "2em 1em" : "2.5em"};
`;