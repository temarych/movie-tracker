import { Card, Dialog, IconButton, Modal, Pagination, Paper, Stack, useMediaQuery, useTheme } from "@mui/material";
import styled, { css } from "styled-components";
import CloseIcon from "@mui/icons-material/Close"
import { useEffect, useState } from "react";
import { Loader } from "@modules/components/Loader";
import { useSelector } from "react-redux";
import { IAppState } from "@store/index";
import { IImage } from "@typings/moviedb/models";

export interface ImageDialogHeaderProps {
  onClose?: () => void;
  size: "small" | "large";
}

export const ImageDialogHeader = (props: ImageDialogHeaderProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);

  return (
      <ImageDialogHeader.Wrapper>
        <IconButton
          size={props.size === "small" ? "medium" : "large"}
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
      </ImageDialogHeader.Wrapper>
  );
}

ImageDialogHeader.Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

export interface ImageDialogFooterProps {
  imageIndex: number;
  imagesCount: number;
  size: "small" | "large";
  onImageChange?: (imageIndex: number) => void;
}

export const ImageDialogFooter = (props: ImageDialogFooterProps) => {
  return (
    <ImageDialogFooter.Wrapper>
      <Card
        elevation={0}
        sx={{ borderRadius: "10em", p: ".5em" }}
      >
        <Pagination
          size={props.size}
          count={props.imagesCount}
          page={props.imageIndex + 1}
          onChange={(_, page) => props.onImageChange && props.onImageChange(page - 1)}
        />
      </Card>
    </ImageDialogFooter.Wrapper>
  );
}

ImageDialogFooter.Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export interface ImageDialogProps {
  onClose?: () => void;
  isOpen?: boolean;
  imagesCount: number;
  images: IImage[];
  imageIndex: number;
  onImageChange: (index: number) => void;
  aspectRatio: string;
}

export const ImageDialog = (props: ImageDialogProps) => {
  const mode = useSelector((state: IAppState) => state.config.mode);
  const theme = useTheme();

  const [isLoaded, setIsLoaded] = useState(false);

  const isPocket = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const image = props.images.at(props.imageIndex) ?? null;

  useEffect(() => {
    setIsLoaded(false);
  }, [image]);

  return (
    <Modal
      open={!!props.isOpen} 
      onClose={props.onClose}
    >
      <ImageDialog.Wrapper isMobile={isMobile}>
        {isPocket && (
          <ImageDialogHeader
            onClose={props.onClose}
            size={isMobile ? "small" : "large"}
          />
        )}
        
        <ImageDialog.Body>
          <ImageDialog.Container $aspectRatio={props.aspectRatio}>
            {!isLoaded && <Loader />}
            {image && (
              <ImageDialog.Image
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                onLoad={() => setIsLoaded(true)}
              />
            )}
            <ImageDialog.Mask>
              {!isPocket && (
                <ImageDialogHeader
                  onClose={props.onClose}
                  size={isMobile ? "small" : "large"}
                />
              )}
              {!isPocket && (
                <ImageDialogFooter 
                  imageIndex={props.imageIndex}
                  imagesCount={props.imagesCount}
                  onImageChange={props.onImageChange}
                  size={isMobile ? "small" : "large"}
                />
              )}
            </ImageDialog.Mask>
          </ImageDialog.Container>
        </ImageDialog.Body>

        {isPocket && (
          <ImageDialogFooter 
            imageIndex={props.imageIndex}
            imagesCount={props.imagesCount}
            onImageChange={props.onImageChange}
            size={isMobile ? "small" : "large"}
          />
        )}
      </ImageDialog.Wrapper>
    </Modal>
  );
}

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
  padding: 1.5em;
`;

ImageDialog.Image = styled.img`
  height: 100%;
  width: 100%;
  user-select: none;
  object-fit: cover;
`;

ImageDialog.Container = styled(Card)<{
  $aspectRatio: string;
}>`
  position: absolute;
  overflow: hidden;
  border-radius: 1em !important;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  max-width: 80em;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
`;

ImageDialog.Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

ImageDialog.Wrapper = styled.div<{
  isMobile: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ isMobile }) => isMobile ? "1em" : "2em"};
  padding: ${({ isMobile }) => isMobile ? "1em" : "3em"};
`;