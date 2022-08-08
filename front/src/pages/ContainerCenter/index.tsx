import React, { KeyboardEvent, ReactElement } from "react";
import { useRecoilState } from "recoil";
import store from "../../store";
import { CustomReactPortal, domData } from "../../store/module/home";
import "./index.less";
import lodash from "lodash";
import { getClassName, addClassName, removeClassName } from "../../utils/ClassName";

const ContainerCenter = () => {
  const [dom, setDom] = useRecoilState(store.home.domData);

  // 给每个组件添加点击事件
  const addClickProps = (itemProps: any, children: CustomReactPortal) => {
    console.log("itemProps", itemProps);
    return {
      ...itemProps,
      className: addClassName(itemProps.className, ["k-hover"]),
      onClick: (e: KeyboardEvent<HTMLElement>) => handleClick(e, children),
    };
  };

  // 处理组件点击选中
  const handleClick = (
    e: KeyboardEvent<HTMLElement>,
    curDom: CustomReactPortal
  ) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target, curDom);
    const copy = lodash.cloneDeep(curDom);
    let p1 = lodash.cloneDeep(dom);
    let p2 = p1;
    let cur = null;
    console.log("className", getClassName(curDom.props.className));
    // while (p2 && typeof p2 !== "string" && typeof p2 !== "number") {
    //   const { className } = p2.props;
    //   p2.props.className = removeClassName(className, ["k-select"]);
    //   if (p2.key === curDom.key) {
    //     cur = p2;
    //     p2.props.className = addClassName(className, ["k-select"]);
    //   }
    //   // p2 = p2.children as CustomReactPortal;
    // }
    // setDom(p1);
  };

  const renderItemChildren = (dom: CustomReactPortal[]): ReactElement[] | null => {
    if(!dom) return null
    console.log("dom", dom)
    if (typeof dom === "string") return dom; 
    const doms: ReactElement[] = [];
    const len = dom.length;
    for (let i = 0; i< len; i++) {
      const item = dom[i];
      if (item?.tag === 1) {
        doms.push(React.createElement(item.type, addClickProps({key: item.key, ...item.props}, item), item.children.join()));
      } else {
        // @ts-ignore
        doms.push(React.createElement(item.type, addClickProps({key: item.key, ...item.props}, item), renderItemChildren(item.children)));
      }
    }

    return doms;
  }

  return React.createElement(
    "div",
    { className: "k-container-center" },
    // childrenContent(dom)
    renderItemChildren(dom)
    // React.createElement(dom[0].type, dom[0].props, dom[0].children),
    // React.createElement(dom[1].type, dom[1].props, dom[1].children)
  );
};

export default ContainerCenter;
