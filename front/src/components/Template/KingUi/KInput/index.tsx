import { useEffect, useRef } from "react";
import useSetAttribute from "../../../../hooks/useSetAttribute";
import "./index.less";

const KInput = ({ className, ...props }: any) => {
  const ele = useRef<HTMLDivElement>(null);
  useSetAttribute(ele, props);

  useEffect(() => {
    ele.current?.setAttribute("data-component-prevent-select", "true");
  }, []);

  return (
    <div
      ref={ele}
      className={`k-input k-input_default${className ? ` ${className}` : ""}`}
    >
      <input type="text" />
    </div>
  );
};

export default KInput;
