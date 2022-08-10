import { Fragment, ReactPortal } from 'react';
import { atom, selector } from "recoil";
import Utils from "../../utils/Utils";
import KingUi from '../../components/Template/KingUi';

export interface CustomReactPortal extends ReactPortal {
    key: string | number
    children: CustomReactPortal[] | string | number
    isCustomComponent?: boolean // 是否是组件
    tag?: string // 标签类型 主要用于组件
    isLoop?: boolean // 是否循环 使用key
}

export const domData = atom<CustomReactPortal[]>({
    key: "update_canvas_dom",
    default: [
        {
          key: Utils.uuid(),
          type: Fragment,
          tag: "Fragment",
          isCustomComponent: true,
          props: {},
          children: [
            {
                key: Utils.uuid(),
              type: KingUi.KAlert,
              tag: "KAlert",
              isCustomComponent: true,
              props: {},
              children: "Hello",
            },
            {
                key: Utils.uuid(),
              type: KingUi.KButton,
              tag: "KButton",
              isCustomComponent: true,
              props: {},
              children: " World",
            },
            {
                key: Utils.uuid(),
              type: KingUi.KButton,
              tag: "KButton",
              isCustomComponent: true,
              props: {},
              children: " World",
            },
          ],
        },
        {
            key: Utils.uuid(),
          type: "span",
          props: {"data-component-active": "false"},
          children: " !!!",
        },
        {
            key: Utils.uuid(),
          type: "ul",
          props: {"data-component-active": "false"},
          isLoop: true,
          children: [
            {
                key: Utils.uuid(),
              type: "li",
              props: { key: "a", "data-component-active": "false" },
              children: 1,
            },
            {
                key: Utils.uuid(),
              type: "li",
              props: { key: "b", "data-component-active": "false" },
              children: 2,
            },
            {
                key: Utils.uuid(),
              type: "li",
              props: { key: "c", "data-component-active": "false" },
              children: 3,
            },
            {
                key: Utils.uuid(),
              type: "li",
              props: { key: "d", "data-component-active": "false" },
              children: 4,
            },
          ],
        },
      ],
})

export const expandDomData = selector({
  key: "expandDomData",
  get: ({get}) => get(domData),
  set: ({set}, newValue) =>{
    return set(domData, newValue);
  }
})

export const selectData = atom<CustomReactPortal | null>({
    key: "update_select_dom",
    default: null,
})