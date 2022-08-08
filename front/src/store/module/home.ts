import { ReactPortal } from 'react';
import {atom} from "recoil";
import KButton from '../../components/KButton';

export interface CustomReactPortal extends ReactPortal {
    isCustomComponent?: boolean
    children: CustomReactPortal | string
}

export const domData = atom<CustomReactPortal>({
    key: "update_dom",
    default: {
        key: 1,
        type: "div",
        props: {},
        children:  {
            key: 2,
            type: "p",
            props: {},
            children: {
                key: 3,
                type: KButton,
                props: {},
                isCustomComponent: true,
                children:"KButton",
            }
        }
    },
})