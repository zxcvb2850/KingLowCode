import { ReactElement } from 'react';
import {atom} from "recoil";

export const domData = atom<ReactElement|null>({
    key: "update_dom",
    default: null,
})