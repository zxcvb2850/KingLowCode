import { useState, ChangeEvent, useEffect, useCallback, Fragment } from "react";
import { useRecoilState } from "recoil";
import loadsh from "lodash";
import store from "../../store";
import "./index.less";
import { CustomReactPortal } from "../../store/module/home";
import Utils from "../../utils/Utils";
import KingUi from "../../components/Template/KingUi";
import useChangeComponent from "../../hooks/useChangeComponent";
import {DATA_COMPONENT_ACTIVE} from "../../utils/_Constant";
import { Select } from "antd";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import React from "react";

const ContainerRight = () => {
  const [selectorDomData, setSelectorDomData] = useRecoilState(store.home.selectorDomData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);

  const { insertSelectorDom, insertBrotherSelectorDom, deleteSelectorDom, upSelectorDom, downSelectorDom, updateSelectorDom: changeUpdateSelectorDom } = useChangeComponent();

  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (selectData && !loadsh.isArray(selectData.children)) {
      setValue(`${selectData.children}`);
    }
  }, [selectData]);

  // 修改内容
  const changeValueContent = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    changeValue(val);
  };
  // 提交修改内容
  const changeValue = useCallback(
    loadsh.debounce((value: string) => {
      if (selectData) {
        const doms = changeUpdateSelectorDom(selectData.key,{children: value});
        setSelectorDomData(doms);
      }
    }, 300),
    [selectData]
  );

  // 按钮 - 插入节点
  const handleInsertDom = () => {
    console.log("-- 插入某个节点 --");
    const parentKey = selectData?.key || null;
    const targetDom: CustomReactPortal = {
      key: Utils.uuid(),
      type: KingUi.KButton,
      tag: "KButton",
      isCustomComponent: true,
      props: {},
      children: "我是新插入的节点",
    };
    const newDom = insertSelectorDom(parentKey, targetDom);

    setSelectorDomData(newDom);
  };
  // 按钮 - 插入兄弟节点，当前节点之上或当前节点之下
  const handleInsertBrotherDom = () => {
    const brotherKey = selectData?.key || null;
    const targetDom: CustomReactPortal = {
      key: Utils.uuid(),
      type: KingUi.KButton,
      tag: "KButton",
      isCustomComponent: true,
      props: {},
      children: "我是新插入的兄弟节点",
    };

    const newDom = insertBrotherSelectorDom(
      brotherKey,
      targetDom,
      selectorDomData,
      true
    );
    setSelectorDomData(newDom);
  };
  // 按钮 - 删除节点
  const handleDeleteDom = () => {
    console.log("-- 删除某个节点 --");
    if (!selectData) return;
    const parentKey = selectData.key;
    const newDom = deleteSelectorDom(parentKey);
    setSelectorDomData(newDom);
    setSelectData(null);
  };

  // 按钮 - 上移节点
  const handleUpDom = () => {
    console.log("-- 上移某个节点 --");
    if (!selectData) return;

    const key = selectData.key;
    const newDom = upSelectorDom(key);
    setSelectorDomData(newDom);
  }

  // 按钮 - 下移节点
  const handleDownDom = () => {
    console.log("-- 下移某个节点 --");
    if (!selectData) return;
    const key = selectData.key;
    const newDom = downSelectorDom(key);
    setSelectorDomData(newDom);
  }

  // 复制节点
  const handleCopyDom = () => {
    console.log("-- 复制某个节点 --");
    if (!selectData) return;
    const copyDom = loadsh.cloneDeep(selectData);
    copyDom.key = Utils.uuid();
    const newDom = insertBrotherSelectorDom(selectData.key, copyDom);
    setSelectorDomData(newDom);
  }

  // 修改 ICON
  const changeAlertIcon = (value: string) => {
    const copySelectData = loadsh.cloneDeep(selectData);
    const props = copySelectData?.props || {};
    if (value) {
      props.showIcon = true;
      const icons = {
        "StepBackwardOutlined": StepBackwardOutlined,
        "StepForwardOutlined": StepForwardOutlined
      };
      // @ts-ignore
      props.icon = React.createElement(icons[value], null, null);
    } else {
      props.showIcon = false;
    }
    console.log("value", value);
    console.log("selectorDomData", selectorDomData);
    console.log("copySelectData", copySelectData);
    setSelectorDomData([copySelectData as CustomReactPortal]);
  }

  return (
    <div className="k-container-right">
      right
      <KingUi.KButton onClick={handleInsertDom}>插入节点</KingUi.KButton>
      <KingUi.KButton onClick={handleInsertBrotherDom}>
        插入兄弟节点
      </KingUi.KButton>
      <KingUi.KButton onClick={handleDeleteDom}>删除节点</KingUi.KButton>
      <KingUi.KButton onClick={handleUpDom}>上移节点</KingUi.KButton>
      <KingUi.KButton onClick={handleDownDom}>下移节点</KingUi.KButton>
      <KingUi.KButton onClick={handleCopyDom}>复制节点</KingUi.KButton>
      {selectData?.key}
      {selectData ? (
        Utils.isDomBase(selectData) ? (
          <div>
            <div>
              <h4>组件 {selectData.tag}</h4>
            </div>
            <div>
              <span>value: </span>
              <input type="text" value={value} onChange={changeValueContent} />
            </div>
            <div>
              <span>icon: </span>
              <Select onChange={changeAlertIcon}>
                <Select.Option value={"0"}>无ICON</Select.Option>
                <Select.Option value={"StepBackwardOutlined"}><StepBackwardOutlined/></Select.Option>
                <Select.Option value={"StepForwardOutlined"}><StepForwardOutlined/></Select.Option>
              </Select>
            </div>
          </div>
        ) : (
          <div>
            <h4>组件 {selectData.tag}</h4>
          </div>
        )
      ) : (
        <div>
          <h4>请选择组件</h4>
        </div>
      )}
    </div>
  );
};

export default ContainerRight;
