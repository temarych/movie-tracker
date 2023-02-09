import { alpha, AppBar, Avatar, darken, IconButton, lighten, Theme, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import { ModeSwitch } from "./ModeSwitch";
import { Logo } from "./Logo";

export const contrast = (theme: Theme) => {
  return {
    sx: {
      color: theme.palette.mode === "light" ? "black" : "white"
    }
  };
}

export const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Toolbar />
      <AppBar position="fixed" variant="outlined">
        <Toolbar>
          <Header.Container>
            <Logo />
            <Header.Space />
            <Header.NavBar>
              <IconButton 
                onClick={() => navigate("/")}
                size="large"
                {...contrast(theme)}
              >
                <HomeIcon />
              </IconButton>

              <IconButton 
                onClick={() => navigate("/favorite")}
                size="large"
                {...contrast(theme)}
              >
                <FavoriteIcon />
              </IconButton>

              <ModeSwitch />
            </Header.NavBar>
          </Header.Container>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 80em;
  width: 100%;
  margin: auto;
`;

Header.Space = styled.div`
  flex: 1;
`;

Header.NavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;