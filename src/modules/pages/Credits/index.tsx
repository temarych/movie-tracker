import styled from "styled-components";

export const Credits = () => {
  return (
    <Credits.Wrapper>
      <Credits.Container>
        credits
      </Credits.Container>
    </Credits.Wrapper>
  );
}

Credits.Container = styled.div`
  max-width: 80em;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 1.5em;
  position: relative;
`;

Credits.Wrapper = styled.div`
  display: flex;
  padding: 1.5em;
`;