import { useState, ChangeEvent, useEffect, useCallback, Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import loadsh from "lodash";
import store from "../../store";
import "./index.less";
import { CustomReactPortal } from "../../store/module/home";
import Utils from "../../utils/Utils";
import KingUi from "../../components/Template/KingUi";

const ContainerRight = () => {
  const [selectorDomData, setSelectorDomData] = useRecoilState(
    store.home.selectorDomData
  );
  const selectData = useRecoilValue(store.home.selectData);
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
      ],
    },
    {
      key: "5427ab12-3d6f",
      type: "span",
      tag: "span",
      props: {
        "data-component-active": "false",
      },
      children: " !!!",
    },
    {
      key: "a5f06c48-0e6e",
      type: "ul",
      tag: "ul",
      props: {
        "data-component-active": "false",
      },
      isLoop: true,
      children: [
        {
          key: "a866b984-c3e0",
          type: "li",
          tag: "li",
          props: {
            key: "a",
            "data-component-active": "false",
          },
          children: 1,
        },
        {
          key: "f8fb7a73-0c36",
          type: "li",
          tag: "li",
          props: {
            key: "b",
            "data-component-active": "false",
          },
          children: 2,
        },
        {
          key: "98d84532-de70",
          type: "li",
          tag: "li",
          props: {
            key: "c",
            "data-component-active": "false",
          },
          children: 3,
        },
        {
          key: "316907ab-9073",
          type: "li",
          tag: "li",
          props: {
            key: "d",
            "data-component-active": "false",
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
        console.log("item", item);
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

  /**
   * 插入节点
   * @param key 需要插入节点位置的key
   * @param iDom 需要插入的节点数据
   * @param doms 当前所有节点数据
   * @returns 当前节点插入后的数据
   */
  const insertSelectorDom = (
    key: string | null,
    iDom: CustomReactPortal,
    doms?: CustomReactPortal[]
  ): CustomReactPortal[] => {
    doms = doms || selectorDomData;
    const copyDom: CustomReactPortal[] = loadsh.cloneDeep(doms);
    if (!key) {
      copyDom.push(iDom);
    } else {
      const len = copyDom.length;
      for (let i = 0; i < len; i++) {
        const item = copyDom[i];
        if (item.key === key && Array.isArray(item.children)) {
          const isExist = item.children.some((n) => n.key === iDom.key);

          if (!isExist) item.children.push(iDom);
          else console.log("%c 节点存在，请检查该节点的准确性", "color:red;");
        } else if (Array.isArray(item.children)) {
          insertSelectorDom(key, iDom, item.children);
        }
      }
    }
    return copyDom;
  };

  // 删除节点
  const deleteSelectorDom = (
    key: string | null,
    doms?: CustomReactPortal[]
  ): CustomReactPortal[] => {
    doms = doms || selectorDomData;
    const copyDom: CustomReactPortal[] = loadsh.cloneDeep(doms);
    if (!key) return doms;

    const len = copyDom.length;
    for (let i = 0; i < len; i++) {
      const item = copyDom[i];
    }
    return [];
  };

  // 查询节点
  const searchSelectorDom = (key: string): CustomReactPortal | null => {
    return null;
  };

  // 查询父节点
  const searchParentSelectorDom = () => {};

  // 修改节点
  const editParentSelectorDom = () => {};

  // 查询兄弟节点
  const searchBrotherSelector = () => {};

  const handleInsertDom = () => {
    console.log("-- 末尾插入节点 --");

    const parentKey = dom[2].key;
    // const parentKey = "a5f06c48-0e6e";
    // const parentKey = "3aeb8223-039e";
    // const parentKey = null;
    /* const targetDom: CustomReactPortal = {
      key: Utils.uuid(),
      type: KingUi.KButton,
      tag: "KButton",
      isCustomComponent: true,
      props: {},
      children: "我是新插入的节点",
    };
    const newDom = insertSelectorDom(parentKey, targetDom, dom);*/
    const newDom = deleteSelectorDom(parentKey, dom);
    console.log("newDom", newDom);

    // setSelectorDomData(newDom);
  };

  return (
    <div className="k-container-right">
      right
      <KingUi.KButton onClick={handleInsertDom}>插入节点</KingUi.KButton>
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
