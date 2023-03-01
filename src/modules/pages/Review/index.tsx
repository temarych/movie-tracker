import { Loader } from "@modules/components/Loader";
import { Typography } from "@mui/material";
import { useGetReviewDetailsQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const Review = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: reviewData } = useGetReviewDetailsQuery(id);

  if (!reviewData) return <Loader />;

  return (
    <Review.Wrapper>
      <Review.Container>
        <Typography variant="h5">
          Review
        </Typography>
        <Typography variant="subtitle1">
          {reviewData.content}
        </Typography>
      </Review.Container>
    </Review.Wrapper>
  );
}

Review.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  position: relative;
`;

Review.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;