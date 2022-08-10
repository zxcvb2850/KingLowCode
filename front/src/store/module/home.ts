import { ReactPortal } from 'react';
import { atom, selector } from "recoil";
import { expandTree } from '../../utils/ComponentsTree';

export interface CustomReactPortal extends ReactPortal {
    key: string | number
    children: CustomReactPortal[] | string | number
    isCustomComponent?: boolean // 是否是组件
    tag?: string // 标签类型 主要用于组件
    isLoop?: boolean // 是否循环 使用key
}

// 数据树结构
export const domData = atom<CustomReactPortal[]>({
    key: "domData",
    default: [],
})

// 修改数据树的同时需要修改其他的store
export const selectorDomData = selector({
  key: "selectorDomData",
  get: ({get}) => get(domData),
  set: ({set}, newValue) =>{
    set(expandDomData, expandTree(newValue as CustomReactPortal[]));
    return set(domData, newValue);
  }
})

// 平铺数据，方便查询数据
export const expandDomData = atom<CustomReactPortal[]>({
  key: "expandDomData",
  default: [],
})

export const selectData = atom<CustomReactPortal | null>({
    key: "update_select_dom",
    default: null,
})