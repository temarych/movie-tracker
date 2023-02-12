import { Avatar, AvatarGroup, IconButton } from "@mui/material";
import styled from "styled-components";
import ShowMoreIcon from "@mui/icons-material/ArrowForwardIosOutlined";

export const CastWidget = () => {
  return (
    <CastWidget.Wrapper>
      <AvatarGroup>
        <Avatar sx={{ width: "3em", height: "3em" }} />
        <Avatar sx={{ width: "3em", height: "3em" }} />
        <Avatar sx={{ width: "3em", height: "3em" }} />
      </AvatarGroup>
    </CastWidget.Wrapper>
  );
}

CastWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.5em;
  width: 100%;
`;