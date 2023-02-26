import { Button } from "@mui/material";
import { IImage } from "@typings/moviedb/models";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export interface GalleryWidgetProps {
  images: IImage[];
  onClick?: () => void;
}

export const GalleryWidget = (props: GalleryWidgetProps) => {
  const navigate = useNavigate();

  return (
    <GalleryWidget.Wrapper>
      <GalleryWidget.Container>
        <GalleryWidget.LeftImage src={`https://image.tmdb.org/t/p/w500/${props.images[0]?.file_path}`} />
        <GalleryWidget.FrontImage src={`https://image.tmdb.org/t/p/w500/${props.images[1]?.file_path}`} />
        <GalleryWidget.RightImage src={`https://image.tmdb.org/t/p/w500/${props.images[2]?.file_path}`} />
      </GalleryWidget.Container>
      <Button 
        size="large" 
        fullWidth 
        sx={{ maxWidth: "15em" }}
        onClick={props.onClick}
      >
        See gallery
      </Button>
    </GalleryWidget.Wrapper>
  );
}

GalleryWidget.Image = styled.img`
  width: 10em;
  height: 15em;
  object-fit: cover;
  border-radius: 1em;
`;

GalleryWidget.RightImage = styled(GalleryWidget.Image)`
  transform: rotate(15deg) scale(0.9);
  filter: brightness(0.5);
`;

GalleryWidget.LeftImage = styled(GalleryWidget.Image)`
  transform: rotate(-15deg) scale(0.9);
  filter: brightness(0.5);
`;

GalleryWidget.FrontImage = styled(GalleryWidget.Image)`
  position: absolute;
  z-index: 1;
`;

GalleryWidget.Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

GalleryWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5em;
  align-items: center;
  justify-content: center;
`;