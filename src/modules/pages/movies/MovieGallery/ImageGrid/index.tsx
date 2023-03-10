import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { ImageDialog } from "./ImageDialog";
import { motion } from "framer-motion";
import { IImage } from "@typings/moviedb/models";
import { Pagination } from "@mui/material";

export interface ImageGridProps {
  images: IImage[];
  minImageWidth: string;
  imageDialogAspectRatio: string;
  aspectRatio?: string;
  imagesGap?: string;
  gap?: string;
}

export const ImageGrid = (props: ImageGridProps) => {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState<boolean>(false);

  const maxImagesPerPage = 20;
  const imagesPerPage = Math.ceil(props.images.length / maxImagesPerPage);

  const images = props.images.slice((page - 1) * maxImagesPerPage, page * maxImagesPerPage);
  
  useEffect(() => {
    if (!imageIndex) return;
    const page = Math.floor(imageIndex / maxImagesPerPage) + 1;
    setPage(page);
  }, [imageIndex]);

  return (
    <ImageGrid.Wrapper $gap={props.gap ?? "1.5em"}>
      <ImageGrid.Container 
        $minImageWidth={props.minImageWidth}
        $imagesGap={props.imagesGap ?? "1.5em"}
      >
        <AnimatePresence>
          {images.map(image => {
            const index = props.images.indexOf(image);
            return (
              <motion.div key={index} whileHover={{ scale: 1.025 }}>
                <ImageGrid.Image 
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`} 
                  $aspectRatio={props.aspectRatio}
                  onClick={() => {
                    setImageIndex(index);
                    setIsImageDialogOpen(true);
                  }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </ImageGrid.Container>
      <Pagination 
        page={page}
        count={imagesPerPage} 
        size="large"
        onChange={(_, page) => setPage(page)}
      />
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

ImageGrid.Image = styled.img<{
  $aspectRatio?: string;
}>`
  border-radius: 1em;
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  ${({ $aspectRatio }) => $aspectRatio && css`
    aspect-ratio: ${$aspectRatio};
  `}
`;

ImageGrid.Container = styled.div<{
  $minImageWidth: string;
  $imagesGap: string;
}>`
  display: grid;
  ${({ $minImageWidth }) => css`
    grid-template-columns: repeat(auto-fill, minmax(${$minImageWidth}, 1fr));
  `}
  ${({ $imagesGap }) => css`
    gap: ${$imagesGap};
  `}
  width: 100%;
`;

ImageGrid.Wrapper = styled.div<{
  $gap: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => $gap};
  width: 100%;
`;