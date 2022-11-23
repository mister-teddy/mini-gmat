import { MathJax } from "better-react-mathjax";
import { FunctionComponent, HTMLAttributes } from "react";

interface ContentProps extends HTMLAttributes<HTMLElement> {
  content: string
}

const Content: FunctionComponent<ContentProps> = ({ content, className, ...props }) => {

  return <MathJax>
    <div dangerouslySetInnerHTML={{ __html: content }} className={`text-selectable ${className ?? ''}`} {...props} />
  </MathJax>;
}

export default Content;