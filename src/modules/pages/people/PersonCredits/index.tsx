import { Link } from "@modules/components/Link";
import { Loader } from "@modules/components/Loader";
import { Pagination, Stack, useMediaQuery, useTheme } from "@mui/material";
import { 
  useGetPersonCreditsQuery, 
  useGetPersonImagesQuery, 
  useGetPersonQuery 
} from "@store/reducers/movieApi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PersonSidebar } from "./PersonSidebar";
import BackIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { CreditCard } from "./CreditCard";
import { motion } from "framer-motion";
import { mergePersonCredits } from "@utils/helpers/credits";
import { PersonBadge } from "../PersonGallery/PersonBadge";
import { MobileCreditCard } from "./MobileCreditCard";
import { useEffect, useState } from "react";

export const PersonCredits = () => {
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const id = params.id as string;
  const maxCreditsPerPage = 20;

  const [page, setPage] = useState<number>(1);

  const { data: personData } = useGetPersonQuery(id);
  const { data: imagesData } = useGetPersonImagesQuery(id);
  const { data: creditsData } = useGetPersonCreditsQuery(id);

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isLoaded = personData && imagesData && creditsData;

  useEffect(() => window.scrollTo({ top: 0 }), [page]);

  if (!isLoaded) return <Loader />;

  const profilePhoto = imagesData.profiles.at(0) ?? null;

  const credits = mergePersonCredits([ ...creditsData.cast, ...creditsData.crew ])
    .sort((firstCredit, secondCredit) => firstCredit.popularity < secondCredit.popularity ? 1 : -1);

  const pagesCount = Math.ceil(credits.length / maxCreditsPerPage);
  const currentPageCredits = credits.slice((page - 1) * maxCreditsPerPage, page * maxCreditsPerPage);

  return (
    <PersonCredits.Wrapper isMobile={isMobile}>
      <PersonCredits.Container>
        {!isPocket && (
          <PersonSidebar 
            name={personData.name} 
            photoPath={profilePhoto?.file_path ?? null}
            biography={personData.biography}
          />
        )}
        <Stack flex="1" gap={isMobile ? "2em" : "2.5em"}>
          {isPocket && <PersonBadge data={personData} />}
          <Stack gap="1.5em" flexDirection="row" alignItems="center" justifyContent="space-between">
            <Link to={`/person/${id}`}>
              <BackIcon />
              Back to profile
            </Link>
          </Stack>
          <Stack gap={isMobile ? "2em" : "1.5em"}>
            {isMobile ? (
              <PersonCredits.CreditList>
                {currentPageCredits.map(credit => (
                  <motion.div 
                    whileHover={{ scale: 1.025 }}
                    style={{ cursor: "pointer" }}
                    key={credit.credit_id}
                    onClick={() => navigate(`/movie/${credit.id}`)}
                  >
                    <MobileCreditCard 
                      title={credit.title}
                      subtitle={credit.duties.join(", ")}
                      posterPath={credit.poster_path}
                    />
                  </motion.div>
                ))}
              </PersonCredits.CreditList>
            ) : (
              <PersonCredits.CreditGrid>
                {currentPageCredits.map(credit => (
                  <motion.div 
                    whileHover={{ scale: 1.025 }}
                    style={{ cursor: "pointer" }}
                    key={credit.credit_id}
                    onClick={() => navigate(`/movie/${credit.id}`)}
                  >
                    <CreditCard 
                      title={credit.title}
                      subtitle={credit.duties.join(", ")}
                      posterPath={credit.poster_path}
                    />
                  </motion.div>
                ))}
              </PersonCredits.CreditGrid>
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
        </Stack>
      </PersonCredits.Container>
    </PersonCredits.Wrapper>
  );
}

PersonCredits.CreditList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;


PersonCredits.CreditGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 1.5em;
`;

PersonCredits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

PersonCredits.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  display: flex;
  padding: ${({ isMobile }) => isMobile ? "2em 1em" : "2.5em"};
`;