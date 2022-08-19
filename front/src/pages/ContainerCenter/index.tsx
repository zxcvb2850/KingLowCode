import React, {Fragment, useEffect, useRef, useState, MouseEvent, ReactElement, DragEvent} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import store from "../../store";
import {CustomReactPortal} from "../../store/module/home";
import "./index.less";
import lodash from "lodash";
import useChangeComponent from "../../hooks/useChangeComponent";
import {DATA_COMPONENT_ACTIVE, DATA_COMPONENT_INSERT, DATA_COMPONENT_KEY} from "../../utils/_Constant";
import CreateDom from "../../utils/CreateDom";
import loadsh from "lodash";

const ContainerCenter = () => {
  const kContainerCenterEle = useRef<HTMLDivElement>(null);
  const preRenderDomKey = useRef<string | null>(null);
  const {insertSelectorDom, insertBrotherSelectorDom, searchSelectorDom, searchParentSelectorDom, deleteSelectorDom} = useChangeComponent();
  const [selectorDomData, setSelectorDomData] = useRecoilState(store.home.selectorDomData);
  const expandDom = useRecoilValue(store.home.expandDomData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);
  const [insertPositionDom, setInsertPositionDom] = useState<string | null>(null);
  const [insertIsPrev, setInsertIsPrev] = useState<boolean>(false);
  const [insertDOMKey, setInsertDOMKey] = useState<string>("");

  useEffect(() => {
    // 拖拽插入的节点，默认选中
    if (insertDOMKey) {
      const dom = document.querySelector(`[${DATA_COMPONENT_KEY}='${insertDOMKey}']`);
      dom?.setAttribute(DATA_COMPONENT_ACTIVE, "true");
      setInsertDOMKey("");
    }

  }, [insertDOMKey]);

  // 添加自定义 props 属性 custom 拖拽创建组件需要的自定义props
  const addClickProps = (itemProps: any, custom?: any) => {
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
        setSelectData(curSelectData);
      }
      setSelectData(curSelectData);
    }
  };

  //
  const dropContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const name: string = e.dataTransfer.getData("componentName");
    const ui: string = e.dataTransfer.getData("componentUi");

    if (name) {
      const insertDOM: CustomReactPortal = CreateDom(name, ui);

      const positionDom = insertPositionDom ? searchSelectorDom(insertPositionDom) : null;
      let newDom = null;
      if (positionDom && loadsh.isArray(positionDom.children)) {
        const len = positionDom.children.length;
        if (!withInsertParentDom(positionDom)) return;
        newDom = insertSelectorDom(insertPositionDom, insertDOM);
      } else {
        const parentInfo = searchParentSelectorDom(insertPositionDom);
        if (!withInsertParentDom(parentInfo)) return;
        newDom = insertBrotherSelectorDom(insertPositionDom, insertDOM, null, insertIsPrev);
      }
      clearDomStyle();
      setInsertDOMKey(insertDOM.key);
      const delPreDom = deleteSelectorDom(preRenderDomKey.current, newDom);
      setSelectorDomData(delPreDom);
      setSelectData(insertDOM);
      setInsertPositionDom(null);
    }
  };
  const dragLeaveContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("containerCenter dragLeave", e);
    // const delPreDom = deleteSelectorDom(preRenderDomKey.current);
    // setSelectorDomData(delPreDom);
    clearDomStyle();
  };
  const dragOverContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { pageX, pageY } = e.nativeEvent;
    const key =  (e.target as HTMLElement).getAttribute(DATA_COMPONENT_KEY);
    const componentHTML: HTMLElement | null = getComponentNode(e.target as HTMLElement);

    // 获取选中的组件数据
    let curComId:string | null = null;
    // 插入方向
    let isPrev = false;

    if (!!componentHTML) {
      const {offsetLeft, offsetTop, offsetWidth,offsetHeight} = componentHTML;
      if((pageX - offsetLeft) > (offsetWidth / 2) || (pageY - offsetTop) > (offsetHeight / 2)) {
          isPrev = false;
      } else {
          isPrev = true;
      }
      // 获取选中的组件数据
      curComId = componentHTML.getAttribute(DATA_COMPONENT_KEY);

      clearDomStyle();

      componentHTML.setAttribute(DATA_COMPONENT_ACTIVE, "true");
      componentHTML.setAttribute(DATA_COMPONENT_INSERT, isPrev ? "top" : "bottom");
    } else {
      isPrev = false;
    }
    // 插入临时占用的 DOM
    const preRenderDom = CreateDom("PreRender", "virtual-dom");
    preRenderDomKey.current = preRenderDom.key;
    const delDom = deleteSelectorDom(preRenderDom.key);
    const positionDom = curComId ? searchSelectorDom(curComId) : null;
    let newDom: CustomReactPortal[] | null = null;
    if (positionDom && loadsh.isArray(positionDom.children)) {
      newDom = insertSelectorDom(curComId, preRenderDom, delDom);
    } else {
      newDom = insertBrotherSelectorDom(curComId, preRenderDom, delDom, isPrev);
    }
    setSelectorDomData(newDom);

    setInsertPositionDom(curComId);
    setInsertIsPrev(isPrev); // 清空插入的标示
  };

  const withInsertParentDom = (parentInfo: CustomReactPortal | null) => {
    if (!parentInfo) return true;
    const len = (parentInfo.children as CustomReactPortal[]).length;
    if (parentInfo.custom.deepSize != null && len >= (parentInfo?.custom.deepSize || 0)) {
      console.log("%c 已超过子组件最大限制", "color: red");
      clearDomStyle();
      setInsertPositionDom(null);
      return false;
    }
    return true;
  }

  // 清除样式
  const clearDomStyle = () => {
    // 添加选中效果
    const list = document.querySelectorAll(`[${DATA_COMPONENT_ACTIVE}="true"]`);
    list.forEach((ele) => {
      ele.setAttribute(DATA_COMPONENT_ACTIVE, "");
    });

    const insertTopEle = document.querySelector(`[${DATA_COMPONENT_INSERT}="top"]`);
    const insertBottomEle = document.querySelector(`[${DATA_COMPONENT_INSERT}="bottom"]`);
    insertTopEle?.setAttribute(DATA_COMPONENT_INSERT, "");
    insertBottomEle?.setAttribute(DATA_COMPONENT_INSERT, "");
  }

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
      item.custom[DATA_COMPONENT_KEY] = `${item.key}`;
      item.custom[DATA_COMPONENT_ACTIVE] = item.custom.DATA_COMPONENT_ACTIVE || "";

      doms.push(
        React.createElement(
          item.type,
          item?.tag === "Fragment" ? null : addClickProps({...item.props, custom: item.custom}),
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
