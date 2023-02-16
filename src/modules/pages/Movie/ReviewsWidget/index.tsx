import { Pagination } from "@mui/material";
import { IReview } from "@store/reducers/movieApi";
import styled from "styled-components";
import { ReviewCard } from "./ReviewCard";

export interface ReviewsWidgetProps {
  reviews: IReview[];
}

export const ReviewsWidget = (props: ReviewsWidgetProps) => {
  return (
    <ReviewsWidget.Wrapper>
      <ReviewsWidget.Container>
        {props.reviews.map(review => (
          <ReviewCard data={review} key={review.id} />
        ))}
      </ReviewsWidget.Container>
    </ReviewsWidget.Wrapper>
  );
}

ReviewsWidget.Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5em;
`;

ReviewsWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5em;
`;