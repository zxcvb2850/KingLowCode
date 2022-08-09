import React, { KeyboardEvent, ReactElement, Fragment } from "react";
import { useRecoilState } from "recoil";
import store from "../../store";
import { CustomReactPortal } from "../../store/module/home";
import "./index.less";
import lodash from "lodash";
import { addClassName, removeClassName } from "../../utils/ClassName";

const ContainerCenter = () => {
  const [dom, setDom] = useRecoilState(store.home.domData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);

  // 给每个组件添加点击事件
  const addClickProps = (itemProps: any, children: CustomReactPortal) => {
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
    console.log(e.target.className, curDom);
    let selectDom: CustomReactPortal | null = lodash.cloneDeep(curDom);
    let copy = lodash.cloneDeep(dom);
    const newDom = withDomData(copy, curDom.key);
    setSelectData(selectDom);
    setDom(newDom);
  };

  const withDomData = (
    dom: CustomReactPortal[],
    key: string | number
  ): CustomReactPortal[] => {
    if (!dom) return [];
    const len = dom.length;
    for (let i = 0; i < len; i++) {
      const item = dom[i];
      item.props.className = removeClassName(item.props.className, [
        "k-select",
      ]);
      if (item.key === key) {
        item.props.className = addClassName(item.props.className, ["k-select"]);
      }
      const children = item.children;
      if (children && lodash.isArray(children)) {
        withDomData(children, key);
      }
    }

    return dom;
  };

  const renderItemChildren = (
    dom: CustomReactPortal[] | string | number,
    isLoop = false
  ): ReactElement | string | number | null => {
    if (!dom) return null;
    if (typeof dom === "string" || typeof dom === "number") {
      return dom;
    }
    const len = dom.length;
    const doms: ReactElement[] = [];
    for (let i = 0; i < len; i++) {
      const item = dom[i];
      let props = item.props;
      if (isLoop && !item.props?.key) {
        props.key = item.key;
      }
      doms.push(
        React.createElement(
          item.type,
          addClickProps(props, item),
          renderItemChildren(item.children, item.isLoop)
        )
      );
    }
    return React.createElement(Fragment, null, ...(isLoop ? [doms] : doms));
  };

  return React.createElement(
    "div",
    { className: "k-container-center" },
    renderItemChildren(dom)
  );
};

export default ContainerCenter;
