import { Button } from "@mui/material";
import { IImage } from "@store/reducers/movieApi";
import styled from "styled-components";

export interface PhotoWidgetProps {
  data: IImage[];
}

export const PhotoWidget = (props: PhotoWidgetProps) => {
  return (
    <PhotoWidget.Wrapper>
      <PhotoWidget.Container>
        <PhotoWidget.LeftImage src={`https://image.tmdb.org/t/p/w500/${props.data[0].file_path}`} />
        <PhotoWidget.FrontImage src={`https://image.tmdb.org/t/p/w500/${props.data[1].file_path}`} />
        <PhotoWidget.RightImage src={`https://image.tmdb.org/t/p/w500/${props.data[2].file_path}`} />
      </PhotoWidget.Container>
      <Button size="large" fullWidth sx={{ maxWidth: "15em" }}>
        See gallery
      </Button>
    </PhotoWidget.Wrapper>
  );
}

PhotoWidget.Image = styled.img`
  width: 10em;
  height: 15em;
  object-fit: cover;
  border-radius: 1em;
`;

PhotoWidget.RightImage = styled(PhotoWidget.Image)`
  transform: rotate(15deg) scale(0.9);
`;

PhotoWidget.LeftImage = styled(PhotoWidget.Image)`
  transform: rotate(-15deg) scale(0.9);
`;

PhotoWidget.FrontImage = styled(PhotoWidget.Image)`
  position: absolute;
  z-index: 1;
`;

PhotoWidget.Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

PhotoWidget.Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5em;
  align-items: center;
  justify-content: center;
`;