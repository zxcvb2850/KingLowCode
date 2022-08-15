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

const ContainerRight = () => {
  const [selectorDomData, setSelectorDomData] = useRecoilState(
    store.home.selectorDomData
  );
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);

  const { insertSelectorDom, insertBrotherSelectorDom, deleteSelectorDom } =
    useChangeComponent();

  const [value, setValue] = useState<string>("");
  const [dom, setDom] = useState<CustomReactPortal[]>([
    {
      key: "3aeb8223-039e",
      type: Fragment,
      tag: "Fragment",
      isCustomComponent: true,
      props: {},
      children: [
        {
          key: "3382cde6-6a40",
          type: KingUi.KAlert,
          tag: "KAlert",
          isCustomComponent: true,
          props: {},
          children: "Hello",
        },
        {
          key: "db084212-2512",
          type: KingUi.KButton,
          tag: "KButton",
          isCustomComponent: true,
          props: {},
          children: " World",
        },
        {
          key: "0a74b145-96a2",
          type: KingUi.KButton,
          tag: "KButton",
          isCustomComponent: true,
          props: {},
          children: " World",
        },
        {
          key: "0a74b145-96a2",
          type: Fragment,
          tag: "Fragment",
          isCustomComponent: true,
          props: {},
          children: [
            {
              key: "0a74b145-96a3",
              type: "span",
              tag: "span",
              isCustomComponent: true,
              props: {},
              children: "xxxxx",
            },
          ],
        },
      ],
    },
    {
      key: "5427ab12-3d6f",
      type: "span",
      tag: "span",
      props: {
        [DATA_COMPONENT_ACTIVE]: "false",
      },
      children: " !!!",
    },
    {
      key: "a5f06c48-0e6e",
      type: "ul",
      tag: "ul",
      props: {
        [DATA_COMPONENT_ACTIVE]: "false",
      },
      isLoop: true,
      children: [
        {
          key: "a866b984-c3e0",
          type: "li",
          tag: "li",
          props: {
            key: "a",
            [DATA_COMPONENT_ACTIVE]: "false",
          },
          children: 1,
        },
        {
          key: "f8fb7a73-0c36",
          type: "li",
          tag: "li",
          props: {
            key: "b",
            [DATA_COMPONENT_ACTIVE]: "false",
          },
          children: 2,
        },
        {
          key: "98d84532-de70",
          type: "li",
          tag: "li",
          props: {
            key: "c",
            [DATA_COMPONENT_ACTIVE]: "false",
          },
          children: 3,
        },
        {
          key: "316907ab-9073",
          type: "li",
          tag: "li",
          props: {
            key: "d",
            [DATA_COMPONENT_ACTIVE]: "false",
          },
          children: 4,
        },
      ],
    },
  ]);

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
      updateSelectorDom(value);
    }, 600),
    [selectData]
  );

  const updateSelectorDom = (val: string) => {
    if (!selectData) return;
    const copySelectorDom = loadsh.cloneDeep(selectorDomData);

    function loopDom(doms: CustomReactPortal[]): any {
      if (!selectData) return null;
      const len = doms.length;
      for (let i = 0; i < len; i++) {
        const item = doms[i];
        if (item.key === selectData.key) {
          item.children = val;
          break;
        } else if (Utils.isDomBase(item)) {
          item.children = item.children;
        } else {
          item.children = loopDom(item.children as CustomReactPortal[]);
        }
      }

      return doms;
    }
    const doms = loopDom(copySelectorDom);

    setSelectorDomData(copySelectorDom);
  };

  // 按钮 - 插入节点
  const handleInsertDom = () => {
    console.log("-- 插入某个节点 --");
    const parentKey = selectData?.key || null;
    console.log("parentKey", parentKey);
    const targetDom: CustomReactPortal = {
      key: Utils.uuid(),
      type: KingUi.KButton,
      tag: "KButton",
      isCustomComponent: true,
      props: {},
      children: "我是新插入的节点",
    };
    const newDom = insertSelectorDom(parentKey, targetDom);
    console.log("newDom", newDom);

    setSelectorDomData(newDom);
  };
  // 按钮 - 插入兄弟节点，当前节点之上或当前节点之下
  const handleInsertBrotherDom = () => {
    console.log("-- 插入兄弟节点 --");
    const brotherKey = selectData?.key || null;
    console.log("brotherKey", brotherKey);
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
    console.log("newDom", newDom);
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

  return (
    <div className="k-container-right">
      right
      <KingUi.KButton onClick={handleInsertDom}>插入节点</KingUi.KButton>
      <KingUi.KButton onClick={handleInsertBrotherDom}>
        插入兄弟节点
      </KingUi.KButton>
      <KingUi.KButton onClick={handleDeleteDom}>删除节点</KingUi.KButton>
      {selectData?.key}
      {selectData ? (
        Utils.isDomBase(selectData) ? (
          <div>
            <div>
              <h4>组件 {selectData.tag}</h4>
            </div>
            <span>value: </span>
            <input type="text" value={value} onChange={changeValueContent} />
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
