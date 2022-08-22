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
  const mouseOffsetY = useRef<number | null>(null); // 鼠标高度
  const isPreRenderDom = useRef<boolean>(false); // 是否有插入的DOM
  const {insertSelectorDom, insertBrotherSelectorDom, searchSelectorDom, searchParentSelectorDom, deleteSelectorDom} = useChangeComponent();
  const [selectorDomData, setSelectorDomData] = useRecoilState(store.home.selectorDomData);
  const expandDom = useRecoilValue(store.home.expandDomData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);
  const [insertPositionDom, setInsertPositionDom] = useState<string | null>(null);
  const [insertIsPrev, setInsertIsPrev] = useState<boolean>(false);
  const [insertPosition, setInsertPosition] = useState<string>("bottom");
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
      const delDom = deleteSelectorDom(preRenderDomKey.current);

      const insertDOM: CustomReactPortal = CreateDom(name, ui);

      const positionDom = insertPositionDom ? searchSelectorDom(insertPositionDom) : null;
      let newDom = loadsh.cloneDeep(delDom);
      if (insertPosition === "top") {
        newDom = insertBrotherSelectorDom(insertPositionDom, insertDOM, delDom, true);
      } else if (insertPosition === "center") {
        if (withInsertParentDom(positionDom)) {
          newDom = insertSelectorDom(insertPositionDom, insertDOM, delDom);
        }
      } else {
        newDom = insertBrotherSelectorDom(insertPositionDom, insertDOM, delDom, false);
      }

      setInsertDOMKey(insertDOM.key); // 选中的dom key
      setSelectData(insertDOM); // 选中的dom
      setSelectorDomData(newDom);
      setInsertPositionDom(null);
      isPreRenderDom.current = false;

      clearDomStyle();
    }
  };
  const dragLeaveContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log("containerCenter dragLeave", e);
    const {offsetX, offsetY} = e.nativeEvent;
    if (offsetX < 0 || offsetY < 0) {
      // todo -------
      // const delPreDom = deleteSelectorDom(preRenderDomKey.current);
      // setSelectorDomData(delPreDom);
      // clearDomStyle();
    }
  };
  const dragOverContainerCenter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const {offsetX, offsetY} = e.nativeEvent;

    if (mouseOffsetY.current === offsetY) return;
    else mouseOffsetY.current = offsetY;

    const componentHTML: HTMLElement | null = getComponentNode(e.target as HTMLElement);
    const curComKey = componentHTML?.getAttribute(DATA_COMPONENT_KEY) || null

    // 此时鼠标在创建的占位 DOM 上，所以无需再动态创建
    if (preRenderDomKey.current && curComKey === preRenderDomKey.current) return;

    // 创建虚拟节点
    const preRenderDom = CreateDom("PreRender", "virtual-dom");
    preRenderDomKey.current = preRenderDom.key;
    let newDom = null;

    // 插入前先删除占位节点，确保只有一个虚拟节点
    if (isPreRenderDom.current) {
      newDom  = deleteSelectorDom(preRenderDomKey.current);
    }
    if (componentHTML) {
      const {offsetWidth, offsetHeight} = componentHTML;
      /*----------width-----------*/
      const leftWidth = offsetWidth / 3;
      const centerWidth = offsetWidth * 2 / 3;
      const rightWidth = offsetWidth - leftWidth - centerWidth;
      /*----------height-----------*/
      const topHeight = offsetHeight / 3;
      const centerHeight = offsetHeight * 2 / 3;
      const bottomHeight = offsetHeight - topHeight - centerHeight;

      let iPosition:string = "bottom"; // top center bottom
      /*if (offsetX < leftWidth && offsetY < topHeight) {
        // 插入兄弟上一节点
        console.log("上");
        iPosition = "top";
      } else if ((offsetX > leftWidth && offsetX < centerWidth) && (offsetY > topHeight && offsetY < centerHeight)) {
        // 插入子节点
        console.log("中");
        iPosition = "center";
      } else if ((offsetX > centerWidth && offsetX < offsetWidth) && (offsetY > centerHeight && offsetY < offsetHeight)) {
        // 插入兄弟下一节点
        console.log("下");
        iPosition = "bottom";
      }*/

      if (offsetY < topHeight) {
        // 插入兄弟上一节点
        iPosition = "top";
      } else if ((offsetY > topHeight && offsetY < centerHeight)) {
        // 插入子节点
        iPosition = "center";
      } else if ((offsetY > centerHeight && offsetY < offsetHeight)) {
        // 插入兄弟下一节点
        iPosition = "bottom";
      }

      if (iPosition === "top") {
        setInsertPosition("top");
        setInsertIsPrev(true);
        newDom = insertBrotherSelectorDom(curComKey, preRenderDom, newDom, true);
      } else if (iPosition === "center") {
        const positionDom = curComKey ? searchSelectorDom(curComKey) : null;
        if (positionDom && loadsh.isArray(positionDom.children)) {
          setInsertPosition("center");
          newDom = insertSelectorDom(curComKey, preRenderDom, newDom);
        } else {
          setInsertPosition("bottom");
          setInsertIsPrev(false);
          newDom = insertBrotherSelectorDom(curComKey, preRenderDom, newDom, false);
        }
      } else {
        setInsertPosition("bottom");
        setInsertIsPrev(false);
        newDom = insertBrotherSelectorDom(curComKey, preRenderDom, newDom);
      }
    } else {
      setInsertPosition("bottom");
      setInsertIsPrev(false);
      newDom = insertBrotherSelectorDom(curComKey, preRenderDom, newDom);
    }
    setSelectorDomData(newDom);
    setInsertPositionDom(curComKey);
    isPreRenderDom.current = true;
  };

  const withInsertParentDom = (parentInfo: CustomReactPortal | null) => {
    if (!parentInfo) return true;
    const len = (parentInfo.children as CustomReactPortal[]).length;
    if (parentInfo.custom.deepSize != null && (len - 1) >= (parentInfo?.custom.deepSize || 0)) {
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
