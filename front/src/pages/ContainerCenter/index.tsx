import React, {
  MouseEvent,
  ReactElement,
  Fragment,
  useEffect,
  useRef,
  DragEvent, useState,
} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import store from "../../store";
import { CustomReactPortal } from "../../store/module/home";
import "./index.less";
import lodash from "lodash";
import KingUi from "../../components/Template/KingUi";
import Utils from "../../utils/Utils";
import useChangeComponent from "../../hooks/useChangeComponent";
import {DATA_COMPONENT_ACTIVE, DATA_COMPONENT_KEY} from "../../utils/_Constant";

const ContainerCenter = () => {
  const kContainerCenterEle = useRef<HTMLDivElement>(null);
  const {insertSelectorDom, insertBrotherSelectorDom} = useChangeComponent();
  const [selectorDomData, setSselectorDomData] = useRecoilState(store.home.selectorDomData);
  const expandDom = useRecoilValue(store.home.expandDomData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);
  const [insertPositionDom, setInsertPositionDom] = useState<string | null>(null);
  const [insertIsPrev, setInsertIsPrev] = useState<boolean>(false);

  useEffect(() => {
    console.log("expandDom", expandDom);
  }, [expandDom]);

  // 添加自定义 props 属性
  const addClickProps = (itemProps: any, children: CustomReactPortal) => {
    return { ...itemProps };
  };

  // 获取 DOM 当前点击或父级可点击的DOM
  const getComponentNode = (node: HTMLElement): HTMLElement | null => {
    if (node && node.getAttribute(DATA_COMPONENT_ACTIVE) !== null)
      return node;
    else {
      if (node.parentElement) return getComponentNode(node.parentElement);

      return null;
    }
  };

  // 点击 DOM
  const clickContainerCenter = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const componentHTML: HTMLElement | null = getComponentNode(target);
    console.log("componentHTML", componentHTML);

    if (!!componentHTML) {
      // 获取选中的组件数据
      const curComId = componentHTML.getAttribute(DATA_COMPONENT_KEY);
      // 添加选中效果
      let list = document.querySelectorAll(`[${DATA_COMPONENT_ACTIVE}="true"]`);
      list.forEach((el) => {
        el.setAttribute(DATA_COMPONENT_ACTIVE, "");
      });

      let curSelectData: CustomReactPortal | null = null;
      if (curComId && curComId !== selectData?.key) {
        componentHTML.setAttribute(DATA_COMPONENT_ACTIVE, "true");

        curSelectData = findSelectDom(curComId);
      }
      setSelectData(curSelectData);
    }
  };

  //
  const dropContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const name: string = e.dataTransfer.getData("componentName");
    console.log("containerCenter drop", e, name);
    if (name) {
      const insertDOM: CustomReactPortal = {
        key: Utils.uuid(),
        // @ts-ignore
        type: KingUi[name],
        tag: name,
        props: {},
        children: "我是拖拽的按钮",
      };
      console.log("insertDOM", insertDOM, insertPositionDom);
      const newDom = insertBrotherSelectorDom(insertPositionDom, insertDOM, null, insertIsPrev);
      // const newDom = insertSelectorDom(insertPositionDom, insertDOM);
      setSselectorDomData(newDom);
    }
  };
  const dragLeaveContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // console.log("containerCenter dragLeave", e);
  };
  const dragOverContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { offsetX, offsetY, pageX, pageY } = e.nativeEvent;
    const key =  (e.target as HTMLElement).getAttribute(DATA_COMPONENT_KEY);
    const componentHTML: HTMLElement | null = getComponentNode(e.target as HTMLElement);
    // const name =
    console.log("containerCenter dragOver", e, offsetX, offsetY);


    if (!!componentHTML) {
        let isPrev = false;
      const {offsetLeft, offsetTop, offsetWidth,offsetHeight} = componentHTML;
      if((pageX - offsetLeft) > (offsetWidth / 2) || (pageY - offsetTop) > (offsetHeight / 2)) {
          isPrev = false;
      } else {
          isPrev = true;
      }
      // 获取选中的组件数据
      const curComId = componentHTML.getAttribute(DATA_COMPONENT_KEY);
      // 添加选中效果
      let list = document.querySelectorAll(`[${DATA_COMPONENT_ACTIVE}="true"]`);
      list.forEach((el) => {
        el.setAttribute(DATA_COMPONENT_ACTIVE, "");
      });

      componentHTML.setAttribute(DATA_COMPONENT_ACTIVE, "true");

      setInsertPositionDom(curComId);
      setInsertIsPrev(isPrev);
    }
  };

  // 查找当前选中的组件的数据结构
  const findSelectDom = (key: string) => {
    const find = expandDom.get(key);
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
      item.props[DATA_COMPONENT_KEY] = `${item.key}`;
      item.props[DATA_COMPONENT_ACTIVE] = ``;

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

  return (
    <div
      ref={kContainerCenterEle}
      className="k-container-center"
      onDrop={dropContainerCenter}
      onDragLeave={dragLeaveContainerCenter}
      onDragOver={dragOverContainerCenter}
      onClick={clickContainerCenter}
    >
      {renderItemChildren(selectorDomData)}
    </div>
  );
};

export default ContainerCenter;
