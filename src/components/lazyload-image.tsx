import { ImgHTMLAttributes, useState } from "react";
import Loading from "./loading";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {}

const LazyLoadImage = ({ className, ...props }: IProps) => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      {loading && <Loading visible className={`absolute ${className ?? ""}`} />}
      <img
        loading="lazy"
        className={className}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </div>
  );
};

export default LazyLoadImage;
