import { Card, Typography } from "@mui/material";
import { IReview } from "@store/reducers/movieApi";
import styled from "styled-components";

export interface ReviewCardProps {
  data: IReview;
}

export const ReviewCard = (props: ReviewCardProps) => {
  return (
    <ReviewCard.Wrapper>
      <Typography sx={{
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: "3",
        WebkitBoxOrient: "vertical"
      }}>
        {props.data.content}
      </Typography>
    </ReviewCard.Wrapper>
  );
}

ReviewCard.Wrapper = styled(Card)`
  border-radius: 1em !important;
  padding: 1em;
`;