import { Avatar, Card, Rating, Stack, Typography } from "@mui/material";
import { IAppState } from "@store/index";
import { IReview } from "@store/reducers/movieApi";
import { useSelector } from "react-redux";
import styled from "styled-components";

export interface ReviewCardProps {
  data: IReview;
}

export const ReviewCard = (props: ReviewCardProps) => {
  const rating = props.data.author_details.rating && props.data.author_details.rating / 10 * 5;
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
    <ReviewCard.Wrapper variant="outlined">
      <Stack gap="1.5em">
        <Avatar
          src={`https://image.tmdb.org/t/p/w500/${props.data.author_details.avatar_path}`}
          sx={{ width: "3em", height: "3em" }}
        />
        <Typography variant="h6">
          {props.data.author_details.name || props.data.author_details.username}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical"
          }}
        >
          {props.data.content}
        </Typography>
      </Stack>
      <Rating
        max={5}
        precision={0.5}
        value={rating}
        readOnly
        sx={{
          color: mode === "dark" ? "white" : "gray",
          "& .MuiRating-iconEmpty": {
            color: mode === "dark" ? "white" : "gray"
          }
        }}
      />
    </ReviewCard.Wrapper>
  );
}

ReviewCard.Space = styled.div`
  flex: 1;
`;

ReviewCard.Wrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  border-radius: 1.5em !important;
  padding: 1.5em;
  flex: 1;
  gap: 1.5em;
  justify-content: space-between;
`;