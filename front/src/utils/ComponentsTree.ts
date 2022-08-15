/**
 * 组件 DOM 树处理
 */

import {CustomReactPortal, ExpandDomDataType} from '../store/module/home';

// 展开 DOM 树方便搜索和查找
export const expandTree = (dom: CustomReactPortal[]): ExpandDomDataType => {
    const map = new Map<string, CustomReactPortal>();

    function expandArray (dom:CustomReactPortal[]) {
        const len = dom.length;
        for (let i = 0; i < len; i++) {
            const item = dom[i];
            map.set(item.key, item);
            if (
                item.children &&
                Array.isArray(item.children) &&
                item.children.length
            ) {
                expandArray(item.children);
            }
        }
    }
    expandArray(dom);

    return map;
};


export const isDomExist = (key: string | null, expandDomData: ExpandDomDataType): CustomReactPortal | null => {
    if (!key) return null;
    const find = expandDomData.get(key);
    if (!find) {
      console.log("%c 节点不存在，请检查该节点的准确性", "color:red;");
    }
    return find || null;
};

  // 是否有子节点
export const isChildrens = (dom: CustomReactPortal): boolean => {
    if (dom == null) return false;
    if (dom.children && Array.isArray(dom.children)) return true;
    return false;
};
