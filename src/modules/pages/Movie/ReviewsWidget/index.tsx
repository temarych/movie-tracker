import { IReview } from "@typings/moviedb/models";
import styled from "styled-components";
import { ReviewCard } from "./ReviewCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export interface ReviewsWidgetProps {
  reviews: IReview[];
}

export const ReviewsWidget = (props: ReviewsWidgetProps) => {
  const navigate = useNavigate();

  return (
    <ReviewsWidget.Wrapper>
      {props.reviews.map(review => (
        <motion.div 
          whileHover={{ scale: 1.025 }} 
          style={{ cursor: "pointer" }}
          key={review.id}
          onClick={() => navigate(`/review/${review.id}`)}
        >
          <ReviewCard data={review} />
        </motion.div>
      ))}
    </ReviewsWidget.Wrapper>
  );
}

ReviewsWidget.Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));
  gap: 1.5em;
`;