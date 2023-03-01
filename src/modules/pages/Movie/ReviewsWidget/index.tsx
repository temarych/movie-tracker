import { IReview } from "@typings/moviedb/models";
import styled from "styled-components";
import { ReviewCard } from "./ReviewCard";

export interface ReviewsWidgetProps {
  reviews: IReview[];
}

export const ReviewsWidget = (props: ReviewsWidgetProps) => {
  return (
    <ReviewsWidget.Wrapper>
      {props.reviews.map(review => (
        <ReviewCard data={review} key={review.id} />
      ))}
    </ReviewsWidget.Wrapper>
  );
}

ReviewsWidget.Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
  gap: 1.5em;
`;