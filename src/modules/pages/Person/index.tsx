import { Loader } from "@modules/components/Loader";
import { Typography } from "@mui/material";
import { useGetPersonQuery } from "@store/reducers/movieApi";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const Person = () => {
  const params = useParams();
  const id = params.id as string;

  const { data: personData } = useGetPersonQuery(id);

  if (!personData) return <Loader />;

  return (
    <Person.Wrapper>
      <Person.Container>
        <Typography>
          {personData.name}
        </Typography>
      </Person.Container>
    </Person.Wrapper>
  );
}

Person.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2.5em;
  position: relative;
`;

Person.Wrapper = styled.div`
  display: flex;
  padding: 2.5em;
`;