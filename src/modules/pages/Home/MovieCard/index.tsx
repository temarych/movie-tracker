import { Card, IconButton, Rating, Typography } from "@mui/material";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined"
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { IMovie } from "@typings/moviedb/models";

export interface IMovieCardProps {
  data: IMovie;
  onClick?: () => void;
}

export const MovieCard = (props: IMovieCardProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  const posterPath = props.data.poster_path ? `https://image.tmdb.org/t/p/w500/${props.data.poster_path}` : null;

  return (
    <AnimatePresence>
      <motion.div whileHover={{ scale: 1.05 }} onClick={props.onClick}>
        <MovieCard.Wrapper variant="outlined">
          {posterPath && (
            <MovieCard.Poster 
              src={posterPath} 
            />
          )}
          <MovieCard.Shadow />
          <MovieCard.Container>
            <MovieCard.Header>
              <MovieCard.Space />
              <IconButton 
                size="large"
                sx={{ 
                  color: mode === "light" ? "black" : "white",
                  backgroundColor: mode === "light" 
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(0, 0, 0, 0.5)",
                  ":hover": {
                    backgroundColor: mode === "light" 
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(0, 0, 0, 0.7)",
                  }
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </MovieCard.Header>
            <MovieCard.Space />
            <MovieCard.Info>
              <Typography 
                variant="h6" 
                fontWeight="600" 
                fontSize="1em"
                color="white"
              >
                {props.data.title}
              </Typography>
              <Rating 
                max={5} 
                precision={0.5} 
                size="small"
                value={props.data.vote_average / 10 * 5} 
                readOnly
                sx={{
                  color: "white",
                  "& .MuiRating-iconEmpty": {
                    color: "white"
                  }
                }}
              />
            </MovieCard.Info>
          </MovieCard.Container>
        </MovieCard.Wrapper>
      </motion.div>
    </AnimatePresence>
  );
}

MovieCard.Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5em;
`;

MovieCard.Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

MovieCard.Space = styled.div`
  flex: 1;
`;

MovieCard.Shadow = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(360deg, #000000, transparent);
`;

MovieCard.Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

MovieCard.Container = styled.div`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5em;
`;

MovieCard.Wrapper = styled(Card)`
  border-radius: 1em !important;
  position: relative;
  user-select: none;
  cursor: pointer;
  display: flex;
  height: 100%;
`;