import { ReactNode, useLayoutEffect, useRef } from "react";
import useSetAttribute from "../../../../hooks/useSetAttribute";
import "./index.less";

interface KButtonFace {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

const KButton = ({
  children,
  disabled,
  className,
  onClick,
  ...props
}: KButtonFace) => {
  const ele = useRef<HTMLButtonElement>(null);
  useSetAttribute(ele, props);

  return (
    <button
      ref={ele}
      disabled={disabled}
      className={`k-button k-buton_default${className ? ` ${className}` : ""}`}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </button>
  );
};

export default KButton;
