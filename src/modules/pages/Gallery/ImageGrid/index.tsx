import { IImage } from "@store/reducers/movieApi";
import styled, { css } from "styled-components";

export interface ImageGrid {
  images: IImage[];
  minImageWidth: string;
}

export const ImageGrid = (props: ImageGrid) => {
  return (
    <ImageGrid.Wrapper $minImageWidth={props.minImageWidth}>
      {props.images.map((image, index) => (
        <ImageGrid.Image 
          key={index}
          src={`https://image.tmdb.org/t/p/w500${image.file_path}`} 
        />
      ))}
    </ImageGrid.Wrapper>
  );
}

ImageGrid.Image = styled.img`
  border-radius: 1em;
  width: 100%;
  object-fit: cover;
`;

ImageGrid.Wrapper = styled.div<{
  $minImageWidth: string;
}>`
  display: grid;
  ${({ $minImageWidth }) => css`
    grid-template-columns: repeat(auto-fit, minmax(${$minImageWidth}, 1fr));
  `}
  gap: 1.5em;
  width: 100%;
`;