import { Fragment, ReactPortal } from 'react';
import { atom } from "recoil";
import KButton from '../../components/KButton';

export interface CustomReactPortal extends ReactPortal {
    key: string | number
    children: CustomReactPortal[] | string | number
    isCustomComponent?: boolean // 是否是组件
    tag?: number // 标签类型 1 纯文本
    isLoop?: boolean // 是否循环 使用key
}

export const domData = atom<CustomReactPortal[]>({
    key: "update_canvas_dom",
    default: [],
})

export const selectData = atom<CustomReactPortal | null>({
    key: "update_select_dom",
    default: null,
})