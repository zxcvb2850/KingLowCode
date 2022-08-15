import { useRecoilValue } from "recoil";
import store from "../store";
import { CustomReactPortal } from "../store/module/home";
import loadsh from "lodash";
import Utils from "../utils/Utils";
import { isDomExist } from "../utils/ComponentsTree";

const useChangeComponent = () => {
  const selectorDomData = useRecoilValue(store.home.selectorDomData);
  const expandDomData = useRecoilValue(store.home.expandDomData);

  /**
   * 插入子节点
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

    const find = isDomExist(key, expandDomData);
    const isChildrenIsBase = Utils.isDomBase(find);
    if (isChildrenIsBase) {
      console.log("%c 该节点不允许插入子节点，请嵌套插入子节点", "color: red");
    } else {
      // 插入顶层的子组件中
      if (key === null) {
        copyDom.push(iDom);
      } else {
        if (!find) {
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
      }
    }

    return copyDom;
  };
  /**
   * 插入兄弟节点
   * @param key 需要插入节点位置的key
   * @param iDom 需要插入的节点数据
   * @param doms 当前所有节点数据
   * @param isPrev 插入当前节点之前还是之后
   * @returns 当前节点插入后的数据
   */
  const insertBrotherSelectorDom = (
    key: string | null,
    iDom: CustomReactPortal,
    doms: CustomReactPortal[] | null,
    isPrev = false
  ): CustomReactPortal[] => {
    doms = doms || selectorDomData;
    const copyDom: CustomReactPortal[] = loadsh.cloneDeep(doms);

    if (!key) {
      if (isPrev) {
        copyDom.unshift(iDom);
      } else {
        copyDom.push(iDom);
      }
    } else {
      const find = isDomExist(key, expandDomData);
      console.log("find", find, doms);

      if (find) {
        if (!loadsh.isArray(copyDom)) return copyDom;
        let index = copyDom.findIndex((n) => n.key === key);
        console.log("copyDom", copyDom);
        if (index > -1) {
          index = isPrev ? index : index + 1;
          copyDom.splice(index, 0, iDom);
        } else {
          const len = copyDom.length;
          for (let i = 0; i < len; i++) {
            const item = copyDom[i];
            if (loadsh.isArray(item.children)) {
              item.children = insertBrotherSelectorDom(
                key,
                iDom,
                item.children,
                isPrev
              );
            }
          }
        }
      }
    }

    return copyDom;
  };

  /**
   * 删除节点
   * @param key 需要删除节点位置的key
   * @param doms 当前所有节点数据
   * @returns 当前节点删除后的数据
   */
  const deleteSelectorDom = (
    key: string | null,
    doms?: CustomReactPortal[]
  ): CustomReactPortal[] => {
    doms = doms || selectorDomData;
    const copyDom: CustomReactPortal[] = loadsh.cloneDeep(doms);

    const find = isDomExist(key, expandDomData);

    if (find) {
      if (!loadsh.isArray(copyDom)) return copyDom;
      let index = copyDom.findIndex((n) => n.key === key);
      if (index > -1) {
        copyDom.splice(index, 1);
      } else {
        const len = copyDom.length;
        for (let i = 0; i < len; i++) {
          const item = copyDom[i];
          if (loadsh.isArray(item.children)) {
            item.children = deleteSelectorDom(key, item.children);
          }
        }
      }
    }

    return copyDom;
  };

  // 查询节点
  const searchSelectorDom = (key: string): CustomReactPortal | null => {
    return isDomExist(key, expandDomData);
  };

  // 查询父节点
  const searchParentSelectorDom = () => {};

  // 修改节点
  const editParentSelectorDom = () => {};

  // 查询兄弟节点
  const searchBrotherSelector = () => {};

  return { insertSelectorDom, insertBrotherSelectorDom, deleteSelectorDom };
};

export default useChangeComponent;
