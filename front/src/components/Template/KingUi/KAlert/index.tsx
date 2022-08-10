import { useRef } from "react";
import useSetAttribute from "../../../../hooks/useSetAttribute";
import "./index.less";

const KAlert = ({
  children,
  ...props
}: {
  children: any;
  [key: string]: any;
}) => {
  const ele = useRef<HTMLDivElement>(null);
  useSetAttribute(ele, props);

  return (
    <div ref={ele} className={`k-alert-wrap`}>
      <span className="k-alert_content">{children}</span>
    </div>
  );
};

export default KAlert;
