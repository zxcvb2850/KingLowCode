import React, { KeyboardEvent, ReactElement } from "react";
import { useRecoilState } from "recoil";
import store from "../../store";
import { CustomReactPortal } from "../../store/module/home";
import "./index.less";
import lodash from "lodash";

const ContainerCenter = () => {
  const [dom, setDom] = useRecoilState(store.home.domData);

  // 给每个组件添加点击事件
  const addClickProps = (itemProps: any, children: CustomReactPortal) => {
    return {
      ...itemProps,
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
    console.log("className", withClassName(curDom.props.className, "get"));
    while (p2 && typeof p2 !== "string" && typeof p2 !== "number") {
      const { className } = p2.props;
      p2.props.className = withClassName(className, "remove", ["k-select"]);
      if (p2.key === curDom.key) {
        cur = p2;
        p2.props.className = withClassName(className, "add", ["k-select"]);
      }
      p2 = p2.children as CustomReactPortal;
    }
    setDom(p1);
  };

  // 处理className
  const withClassName = (
    className: string | null,
    type: "get" | "add" | "remove",
    target?: string[]
  ): string => {
    let classNames: string[] = [];
    if (!!className) {
      className = className.trim();
      classNames = className?.split(" ") || []; // 查询原始 class
    }
    if (type === "add") {
      // @ts-ignore
      classNames = lodash.uniq([...target, ...classNames]); // 去重
    } else if (type === "remove") {
      // @ts-ignore
      classNames = classNames.filter((n) => !(target.indexOf(n) > -1));
    }
    return classNames.join(" ");
  };

  // 渲染内容
  const childrenContent = (
    children: CustomReactPortal
  ): ReactElement | null => {
    let type = children.type;
    if (!children || children == null) {
      return null;
    } else if (typeof children === "string" || typeof children === "number") {
      return children;
    } else {
      return React.createElement(
        type,
        addClickProps(children.props, children),
        childrenContent(children.children as CustomReactPortal)
      );
    }
  };

  return React.createElement(
    "div",
    { className: "k-container-center" },
    childrenContent(dom)
  );
};

export default ContainerCenter;
