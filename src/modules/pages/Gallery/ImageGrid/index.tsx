import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import styled, { css } from "styled-components";
import { ImageDialog } from "./ImageDialog";
import { motion } from "framer-motion";
import { IImage } from "@typings/moviedb/models";

export interface ImageGridProps {
  images: IImage[];
  minImageWidth: string;
  imageDialogAspectRatio?: string;
}

export const ImageGrid = (props: ImageGridProps) => {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);

  return (
    <ImageGrid.Wrapper $minImageWidth={props.minImageWidth}>
      <AnimatePresence>
        {props.images.map((image, index) => (
          <motion.div key={index} whileHover={{ scale: 1.025 }}>
            <ImageGrid.Image 
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`} 
              onClick={() => {
                setImageIndex(index);
                setIsImageDialogOpen(true);
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {imageIndex !== null && (
        <ImageDialog 
          isOpen={isImageDialogOpen}
          onClose={() => setIsImageDialogOpen(false)}
          images={props.images}
          imageIndex={imageIndex}
          imagesCount={props.images.length}
          onImageChange={setImageIndex}
          aspectRatio={props.imageDialogAspectRatio}
        />
      )}
    </ImageGrid.Wrapper>
  );
}

ImageGrid.Image = styled.img`
  border-radius: 1em;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
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