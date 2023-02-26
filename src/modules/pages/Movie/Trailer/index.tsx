import { IVideo } from "@typings/moviedb/models";
import styled from "styled-components";

export interface TrailerProps {
  data: IVideo;
}

export const Trailer = (props: TrailerProps) => {
  return (
    <Trailer.Wrapper>
      <Trailer.IFrame
        src={`https://www.youtube.com/embed/${props.data.key}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Trailer.Wrapper>
  );
}

Trailer.IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-radius: 1em;
`;

Trailer.Wrapper = styled.div`
  position: relative;
  padding-top: 60%;
  width: 100%;
  overflow: hidden;
`;