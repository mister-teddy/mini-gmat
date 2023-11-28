import {
  ButtonHTMLAttributes,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  large?: boolean;
  loading?: boolean;
  onClick?:
    | React.MouseEventHandler<HTMLElement>
    | ((e: React.MouseEvent<HTMLElement>) => Promise<void>);
}

const Button: FunctionComponent<ButtonProps> = ({
  className,
  large,
  loading,
  children,
  onClick,
  style,
  ...props
}) => {
  const [clickLoading, setLoading] = useState(false);

  return (
    <button
      type="button"
      className={`min-w-0 border border-primary backdrop-blur rounded-xl leading py-4 px-8 active:bg-primary active:text-primary-text flex justify-center items-center ${
        large ? `text-xl font-bold` : ""
      } ${
        loading || clickLoading ? `bg-primary text-primary-text` : ""
      } ${className}`}
      onClick={(e) => {
        if (onClick) {
          const result = onClick(e);
          if (result instanceof Promise) {
            setLoading(true);
            result.finally(() => setLoading(false));
          }
        }
      }}
      disabled={loading || clickLoading}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
