import { useState, ChangeEvent, useEffect, useCallback, Fragment } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import loadsh from "lodash";
import store from "../../store";
import "./index.less";
import { CustomReactPortal, CustomReactPortalChildren } from "../../store/module/home";
import Utils from "../../utils/Utils";
import KingUi from "../../components/Template/KingUi";

const ContainerRight = () => {
  const [selectorDomData, setSelectorDomData] = useRecoilState(
    store.home.selectorDomData
  );
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);
  const expandDomData = useRecoilValue(store.home.expandDomData);
  
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
              children: "xxxxx"
            }
          ],
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

  // 是否有子节点
  const isChildrens = (dom: CustomReactPortal): boolean => {
    if (dom == null) return false;
    if (dom.children && Array.isArray(dom.children)) return true;
    return false;
  };

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

  const isDomExist = (key: string| null): CustomReactPortal| null => {
    if (!key) return null;
    const find = expandDomData.find(n => n.key === key);
    if (!find) {
      console.log("%c 节点不存在，请检查该节点的准确性", "color:red;");
    }
    return find || null;
  }

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
    if (!isDomExist(key)) {
      return copyDom;
    }

    const len = copyDom.length;
    for (let i = 0; i < len; i++) {
      const item = copyDom[i];
      if (item.key === key && Array.isArray(item.children)) {
        item.children.push(iDom);
      } else if (Array.isArray(item.children)) {
        insertSelectorDom(key, iDom, item.children);
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
    if (!isDomExist(key)) {
      return copyDom;
    }

    if (!loadsh.isArray(copyDom)) return copyDom;
      let index = copyDom.findIndex(n => n.key === key);
      if (index > -1) {
        copyDom.splice(index, 1);
        return copyDom;
      } else {
        const len = copyDom.length;
        for (let i = 0; i< len; i++) {
          const item = copyDom[i];
          if (loadsh.isArray(item.children)) {
            item.children = deleteSelectorDom(key, item.children);
          }
        }
      }
    return copyDom;
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

  // 增加节点
  const handleInsertDom = () => {
    console.log("-- 插入某个节点 --");
    if (!selectData) return;
    const parentKey = selectData.key;
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
  // 删除节点
  const handleDeleteDom = ()=>{
    console.log("-- 删除某个节点 --");
    if (!selectData) return;
    const parentKey = selectData.key;
    const newDom = deleteSelectorDom(parentKey);
    setSelectorDomData(newDom);
    setSelectData(null);
  }

  return (
    <div className="k-container-right">
      right
      <KingUi.KButton onClick={handleInsertDom}>插入节点</KingUi.KButton>
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
