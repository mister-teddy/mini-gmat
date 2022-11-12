import { FunctionComponent, HTMLAttributes, useMemo, useState } from "react";

interface ContentProps extends HTMLAttributes<HTMLElement> {
  content: string
}

const Content: FunctionComponent<ContentProps> = ({ content, className, ...props }) => {

  return <div dangerouslySetInnerHTML={{ __html: content }} {...props} />;
}

export default Content;