import { Card, Dialog, IconButton, Modal, Pagination, Paper } from "@mui/material";
import { IImage } from "@store/reducers/movieApi";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react";
import { Loader } from "@modules/components/Loader";
import { useSelector } from "react-redux";
import { IAppState } from "@store/index";

export interface ImageDialogProps {
  onClose?: () => void;
  isOpen?: boolean;
  imagesCount: number;
  images: IImage[];
  imageIndex: number;
  onImageChange: (index: number) => void;
}

export const ImageDialog = (props: ImageDialogProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  const [isLoaded, setIsLoaded] = useState(false);
  const image = props.images[props.imageIndex];

  useEffect(() => {
    setIsLoaded(false);
  }, [image]);

  return (
    <ImageDialog.Wrapper 
      open={!!props.isOpen} 
      onClose={props.onClose}
    >
      <ImageDialog.Container variant="outlined">
        {!isLoaded && <Loader />}
        <ImageDialog.Image 
          src={`https://image.tmdb.org/t/p/original${image.file_path}`} 
          onLoad={() => setIsLoaded(true)}
        />
        <ImageDialog.Mask>
          <ImageDialog.Header>
            <IconButton 
              size="large"
              onClick={props.onClose}
              sx={{ 
                color: mode === "light" ? "black" : "white",
                backgroundColor: mode === "light" 
                  ? "#ffffff"
                  : "#121212",
                ":hover": {
                  backgroundColor: mode === "light" 
                  ? "#f0f0f0"
                  : "#272727",
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </ImageDialog.Header>
          <ImageDialog.Footer>
            <Card 
              elevation={0}
              sx={{ borderRadius: "10em", p: ".5em" }}
            >
              <Pagination 
                size="large" 
                count={props.imagesCount}
                page={props.imageIndex + 1}
                onChange={(_, page) => props.onImageChange(page - 1)}
              />
            </Card>
          </ImageDialog.Footer>
        </ImageDialog.Mask>
      </ImageDialog.Container>
    </ImageDialog.Wrapper>
  );
}

ImageDialog.Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1.5em;
`;

ImageDialog.Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5em;
`;

ImageDialog.Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 88000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

ImageDialog.Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  user-select: none;
`;

ImageDialog.Container = styled(Card)`
  max-height: 100%;
  max-width: 80em;
  position: relative;
  overflow: hidden;
  border-radius: 1em !important;
  display: flex;
  flex-direction: column;
`;

ImageDialog.Wrapper = styled(Modal)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em;
`;