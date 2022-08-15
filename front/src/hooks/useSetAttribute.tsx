import { useLayoutEffect, RefObject } from "react";
import {DATA_COMPONENT_ACTIVE, DATA_COMPONENT_KEY} from "../utils/_Constant";

const useSetAttribute = (ele: RefObject<HTMLElement>, props: any) => {
  useLayoutEffect(() => {
    if (ele.current) {
      ele.current.setAttribute(DATA_COMPONENT_ACTIVE, "");
    }
  }, []);

  useLayoutEffect(() => {
    if (ele.current) {
      if (!!props[DATA_COMPONENT_KEY]) {
        ele?.current.setAttribute(DATA_COMPONENT_KEY, props[DATA_COMPONENT_KEY]);
      }
      if (!!props[DATA_COMPONENT_ACTIVE]) {
        ele?.current.setAttribute(DATA_COMPONENT_ACTIVE, props[DATA_COMPONENT_ACTIVE]);
      }
    }
  }, [props]);

  return null;
};

export default useSetAttribute;
