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
    default: [
        {
          key: 1,
          type: Fragment,
          isCustomComponent: true,
          props: {},
          children: [
            {
              key: 4,
              type: "span",
              props: {},
              children: "Hello",
            },
            {
              key: 5,
              type: KButton,
              isCustomComponent: true,
              props: {},
              children: " World",
            },
          ],
        },
        {
          key: 2,
          type: "span",
          props: {},
          children: " !!!",
        },
        {
          key: 3,
          type: "ul",
          props: {},
          isLoop: true,
          children: [
            {
              key: 6,
              type: "li",
              props: { key: "a" },
              children: 1,
            },
            {
              key: 7,
              type: "li",
              props: { key: "b" },
              children: 2,
            },
            {
              key: 8,
              type: "li",
              props: { key: "c" },
              children: 3,
            },
            {
              key: 8,
              type: "li",
              props: { key: "d" },
              children: 4,
            },
          ],
        },
      ],
})

export const selectData = atom<CustomReactPortal | null>({
    key: "update_select_dom",
    default: null,
})