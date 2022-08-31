import { useLayoutEffect, RefObject } from "react";
import {DATA_COMPONENT_KEY} from "../utils/_Constant";

const useSetAttribute = (ele: RefObject<HTMLElement>, props: any) => {
  useLayoutEffect(() => {
    if (ele.current) {
      // todo
    }
  }, []);

  useLayoutEffect(() => {
    if (ele.current) {
      if (!!props[DATA_COMPONENT_KEY]) {
        ele?.current.setAttribute(DATA_COMPONENT_KEY, props[DATA_COMPONENT_KEY]);
      }
      // todo
    }
  }, [props]);

  return null;
};

export default useSetAttribute;
