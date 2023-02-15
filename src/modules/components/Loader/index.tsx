import { CircularProgress, Paper } from "@mui/material";
import styled from "styled-components";

export const Loader = () => {
  return (
    <Loader.Wrapper variant="elevation" elevation={0}>
      <CircularProgress />
    </Loader.Wrapper>
  );
}

Loader.Wrapper = styled(Paper)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 77000;
`;