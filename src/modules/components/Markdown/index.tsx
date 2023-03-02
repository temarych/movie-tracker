import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import styled, { css } from "styled-components";

export interface MarkdownProps {
  children: string;
  inheritFontWeight?: boolean;
}

export const Markdown = (props: MarkdownProps) => {
  return (
    <Markdown.Wrapper 
      rehypePlugins={[rehypeRaw]}
      inheritFontWeight={!!props.inheritFontWeight}
    >
      {props.children}
    </Markdown.Wrapper>
  );
}

Markdown.Wrapper = styled(ReactMarkdown)<{
  inheritFontWeight: boolean;
}>`
  *:first-child {
    margin-top: 0;
  }
  *:last-child {
    margin-bottom: 0;
  }
  * {
    font-size: inherit;
    ${({ inheritFontWeight }) => inheritFontWeight && css`
      font-weight: inherit;
    `}
  }
`;