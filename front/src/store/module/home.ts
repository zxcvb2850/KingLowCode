import { ReactPortal } from 'react';
import { atom, selector } from "recoil";
import { expandTree } from '../../utils/ComponentsTree';

export interface CustomReactPortal extends ReactPortal {
    key: string
    children: CustomReactPortalChildren
    isCustomComponent?: boolean // 是否是组件
    tag?: string // 标签类型 主要用于组件
    isLoop?: boolean // 是否循环 使用key
    custom: { // 自定义变量
        deepSize?: number, // 子组件的数量
        [key: string]: any,
    }
}

export type CustomReactPortalChildren = CustomReactPortal[] | string | number;

// 数据树结构
export const domData = atom<CustomReactPortal[]>({
    key: "domData",
    default: [],
})

// 修改数据树的同时需要修改其他的store
export const selectorDomData = selector({
  key: "selectorDomData",
  get: ({get}) => get(domData),
  set: ({set}, newValue) => {
    console.log("newValue", newValue);
    set(expandDomData, expandTree(newValue as CustomReactPortal[]));
    return set(domData, newValue);
  }
})

export type ExpandDomDataType = Map<string, CustomReactPortal>
// 平铺数据，方便查询数据
export const expandDomData = atom<ExpandDomDataType>({
  key: "expandDomData",
  default: new Map(),
})

export const selectData = atom<CustomReactPortal | null>({
    key: "update_select_dom",
    default: null,
})
