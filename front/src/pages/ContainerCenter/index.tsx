import React, { KeyboardEvent, ReactElement, Fragment, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import store from "../../store";
import { CustomReactPortal } from "../../store/module/home";
import "./index.less";
import lodash from "lodash";

const ContainerCenter = () => {
  const [dom, setDom] = useRecoilState(store.home.selectorDomData);
  const expandDom = useRecoilValue(store.home.expandDomData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);

  useEffect(() => {
    console.log("expandDom", expandDom);
  }, [expandDom]);

  // 添加自定义 props 属性
  const addClickProps = (itemProps: any, children: CustomReactPortal) => {
    return { ...itemProps };
  };

  // 获取 DOM 当前点击或父级可点击的DOM
  const getComponentNode = (node: HTMLElement): HTMLElement | null => {
    if (node && node.getAttribute("data-component-active") !== null)
      return node;
    else {
      if (node.parentElement) return getComponentNode(node.parentElement);

      return null;
    }
  };

  // 点击 DOM
  const clickContainerCenter = (e: KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target;
    let componentHTML: HTMLElement | null = getComponentNode(target);
    console.log("componentHTML", componentHTML);

    if (!!componentHTML) {
      // 获取选中的组件数据
      const curComId = componentHTML.getAttribute("data-component-key");
      // 添加选中效果
      let list = document.querySelectorAll('[data-component-active="true"]');
      list.forEach((el) => {
        el.setAttribute("data-component-active", "");
      });

      let curSelectData: CustomReactPortal | null = null;
      if (curComId && curComId !== selectData?.key) {
        componentHTML.setAttribute("data-component-active", "true");

        curSelectData = findSelectDom(curComId);
      }
      setSelectData(curSelectData);
    }
  };

  // 查找当前选中的组件的数据结构
  const findSelectDom = (id: string) => {
    const find = expandDom.find((n) => n.key == id);
    return find || null;
  };

  // 渲染组件
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
      const item = lodash.cloneDeep(dom[i]);
      item.props["key"] = `${item.key}`;
      item.props["data-component-key"] = `${item.key}`;
      item.props["data-component-active"] = ``;

      console.log("item.props", item.props);
      doms.push(
        React.createElement(
          item.type,
          item?.tag === "Fragment" ? null : addClickProps(item.props, item),
          renderItemChildren(item.children, item.isLoop)
        )
      );
    }
    return React.createElement(Fragment, null, ...(isLoop ? [doms] : doms));
  };

  return React.createElement(
    "div",
    { className: "k-container-center", onClick: clickContainerCenter },
    renderItemChildren(dom)
  );
};

export default ContainerCenter;
