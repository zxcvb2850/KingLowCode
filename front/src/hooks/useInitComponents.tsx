/**
 * 初始化主舞台组件列表
 */
import { useLayoutEffect, Fragment } from "react";
import { useRecoilState } from "recoil";
import store from "../store";

const useInitComponents = () => {
  const [, setSelectDom] = useRecoilState(store.home.selectorDomData);
  useLayoutEffect(() => {
    /*setSelectDom([
      {
        key: Utils.uuid(),
        type: Fragment,
        tag: "Fragment",
        isCustomComponent: true,
        props: {},
        children: [
          {
            key: Utils.uuid(),
            type: KingUi.KAlert,
            tag: "KAlert",
            isCustomComponent: true,
            props: {},
            children: "Hello",
          },
          {
            key: Utils.uuid(),
            type: KingUi.KButton,
            tag: "KButton",
            isCustomComponent: true,
            props: {},
            children: " World",
          },
          {
            key: Utils.uuid(),
            type: KingUi.KButton,
            tag: "KButton",
            isCustomComponent: true,
            props: {},
            children: " World",
          },
          {
            key: Utils.uuid(),
            type: KingUi.KInput,
            tag: "KInput",
            isCustomComponent: true,
            props: {},
            children: " World",
          },
        ],
      },
      {
        key: Utils.uuid(),
        type: "span",
        tag: "span",
        props: { [DATA_COMPONENT_ACTIVE]: "false" },
        children: " !!!",
      },
      {
        key: Utils.uuid(),
        type: "ul",
        tag: "ul",
        props: { [DATA_COMPONENT_ACTIVE]: "false" },
        isLoop: true,
        children: [
          {
            key: Utils.uuid(),
            type: "li",
            tag: "li",
            props: {},
            children: 1,
          },
          {
            key: Utils.uuid(),
            type: "li",
            tag: "li",
            props: {},
            children: 2,
          },
          {
            key: Utils.uuid(),
            type: "li",
            tag: "li",
            props: {},
            children: 3,
          },
          {
            key: Utils.uuid(),
            type: "li",
            tag: "li",
            props: {},
            children: 4,
          },
        ],
      },
    ]);*/
    setSelectDom([]);
  }, []);

  return null;
};

export default useInitComponents;
