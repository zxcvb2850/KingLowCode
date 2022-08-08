import { Fragment, ReactPortal } from 'react';
import { atom } from "recoil";
import KButton from '../../components/KButton';

export interface CustomReactPortal extends ReactPortal {
    isCustomComponent?: boolean
    children: (CustomReactPortal | string)[]
    tag?: number // 标签类型 1 纯文本
}

export const domData = atom<CustomReactPortal[]>({
    key: "update_dom",
    default: [{
        key: 1,
        type: "div",
        props: {},
        children: [{
            key: 3,
            tag: 1,
            type: "p",
            props: {},
            children: ["this is P 1"],    
        }, {
        key: 4,
        type: "div",
        props: {},
        children: [
            {
                key: 5,
                tag: 1,
                type: "span",
                props: {},
                children: ["this is P 1-1"],    
            },
            {
                key: 6,
                tag: 1,
                type: "p",
                props: {},
                children: ["this is P 1-2"],    
            }   
        ],    
    }]
    }, {
        key: 2,
        type: "div",
        props: {},
        children: [{
            key: 4,
            tag: 1,
            type: "p",
            props: {},
            children: ["this is P 2"],    
        }]
    }],
})

/*
children: [{
            key: 2,
            type: "p",
            props: {},
            children: [{
                key: 3,
                type: KButton,
                props: {},
                isCustomComponent: true,
                children: ["KButton"],
            },
            {
                key: 4,
                type: KButton,
                props: {},
                isCustomComponent: true,
                children: ["KButton"],
            }]
        }]

*/