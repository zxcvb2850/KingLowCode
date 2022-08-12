import { useLayoutEffect, RefObject } from "react";

const useSetAttribute = (ele: RefObject<HTMLElement>, props: any) => {
  useLayoutEffect(() => {
    if (ele.current) {
      ele.current.setAttribute("data-component-active", "");
    }
  }, []);

  useLayoutEffect(() => {
    const dataComponentId = "data-component-key";
    if (ele.current && !!props[dataComponentId]) {
      ele?.current.setAttribute("data-component-key", props[dataComponentId]);
    }
  }, [props]);

  return null;
};

export default useSetAttribute;
