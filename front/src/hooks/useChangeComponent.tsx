/**
 * 节点控制，对节点的增删改查
 * */
import { useRecoilValue, useRecoilState } from "recoil";
import store from "../store";
import {CustomReactPortal, CustomReactPortalChildren} from "../store/module/home";
import loadsh from "lodash";
import Utils from "../utils/Utils";
import { isDomExist } from "../utils/ComponentsTree";

const useChangeComponent = () => {
  const selectorDomData = useRecoilValue(store.home.selectorDomData);
  const expandDomData = useRecoilValue(store.home.expandDomData);
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);

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
    doms?: CustomReactPortal[] | null,
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

      if (find) {
        if (!loadsh.isArray(copyDom)) return copyDom;
        let index = copyDom.findIndex((n) => n.key === key);
        if (index > -1) {
          index = isPrev ? index : index + 1;
          copyDom.splice(index, 0, iDom);
        } else {
          const len = copyDom.length;
          for (let i = 0; i < len; i++) {
            const item = copyDom[i];
            if (loadsh.isArray(item.children)) {
              item.children = insertBrotherSelectorDom(key, iDom, item.children, isPrev);
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

  /**
   * 上移节点
   * @param key 需要删除节点位置的key
   * @param doms 当前所有节点数据
   */
  const upSelectorDom = (
      key: string,
      doms?: CustomReactPortal[] | null
  ):CustomReactPortal[] => {
    doms = doms??selectorDomData;
    const copyDom = loadsh.cloneDeep(doms);
    const index = doms.findIndex(n=>n.key === key);
    if (index > -1) {
      if (index === 0) {
        console.log("%c 已经是该容器中最上面的元素了", "color: red");
      } else {
        copyDom[index] = copyDom.splice(index - 1,1,copyDom[index])[0];
      }
    } else {
      const len = copyDom.length;
      for (let i = 0; i < len; i++) {
        const item = copyDom[i];
        if (Array.isArray(item.children)) {
          item.children = upSelectorDom(key, item.children);
        }
      }
    }

    return copyDom;
  }

  /**
   * 下移节点
   * @param key 需要删除节点位置的key
   * @param doms 当前所有节点数据
   */
  const downSelectorDom = (
      key: string,
      doms?:CustomReactPortal[] | null
  ):CustomReactPortal[] => {
    doms = doms??selectorDomData;
    const copyDom = loadsh.cloneDeep(doms);
    const len = copyDom.length;
    const index = doms.findIndex(n=>n.key === key);
    if (index > -1) {
      if (index === len - 1) {
        console.log("%c 已经是该容器中最下面的元素了", "color: red");
      } else {
        copyDom[index] = copyDom.splice(index + 1,1,copyDom[index])[0];
      }
    } else {
      for (let i = 0; i < len; i++) {
        const item = copyDom[i];
        if (Array.isArray(item.children)) {
          item.children = downSelectorDom(key, item.children);
        }
      }
    }
    return copyDom;
  }

  /**
   * 更新节点
   * @param key 需要更新节点的key
   * @param updateDom 更新的内容 props children
   */
  const updateSelectorDom = (
      key: string,
      updateDom: {props?: any, children?: CustomReactPortalChildren},
  ): CustomReactPortal[] => {
    const copyDom = loadsh.cloneDeep(selectorDomData);
    const copySelectData = loadsh.cloneDeep(selectData);
    const oldDom = expandDomData.get(key);

    function loopUpdateDom (doms: CustomReactPortal[]): any {
      const len = doms.length;
      for (let i = 0; i < len; i++) {
        const item = doms[i];
        if (item.key === key) {
          item.children = updateDom?.children || (oldDom?.children || "");
          item.props = updateDom?.props || oldDom?.props;

          (copySelectData as CustomReactPortal).children = updateDom?.children || (oldDom?.children || "");
          (copySelectData as CustomReactPortal).props = updateDom?.props || oldDom?.props;
          break;
        } else if (Array.isArray(item.children)) {
          item.children = loopUpdateDom(item.children);
        }
      }

      return doms;
    }

    const doms = selectData ? loopUpdateDom(copyDom) : copyDom;
    setSelectData(copySelectData);
    return doms;
  }

  // 查询节点
  const searchSelectorDom = (key: string): CustomReactPortal | null => {
    return isDomExist(key, expandDomData);
  };

  // 查询父节点
  const searchParentSelectorDom = (key: string): CustomReactPortal | null => {
    const copyDom: CustomReactPortal[] = loadsh.cloneDeep(selectorDomData);

    let parentDom: CustomReactPortal | null = null; // 父级节点
    type taskType = {
      parent: CustomReactPortal|null
      children: CustomReactPortal[] | string | number
    }
    const task: taskType[] = [{parent: null, children: copyDom}]; // dom 队列
    let level = 1;

    while (task.length) {
      const first = task.shift();
      if (first) {
        const {parent, children} = first;
        if (Array.isArray(children)) {
          const len = children.length;
          for (let i = 0; i < len; i++) {
            const item = children[i];
            if (item.key === key) {
              parentDom = parent;
              break;
            }
            task.push({parent: item, children: item.children});
          }
        }
        if (parentDom) {
          break;
        }
        level++;
      } else {
        break;
      }
    }

    return parentDom;
  };

  // 修改节点
  const editParentSelectorDom = () => {};

  // 查询兄弟节点
  const searchBrotherSelector = () => {};

  return {
    insertSelectorDom,
    insertBrotherSelectorDom,
    deleteSelectorDom,
    upSelectorDom,
    downSelectorDom,
    updateSelectorDom,
    searchSelectorDom,
    searchParentSelectorDom,
  };
};

export default useChangeComponent;
