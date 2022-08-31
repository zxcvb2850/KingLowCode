import {atom} from "recoil";

interface SelectDomInfoFace {
    width: number
    height: number
    left?: number
    right?: number
    top?: number
    bottom?: number
}

export const selectDomInfo = atom<SelectDomInfoFace | null>({
    key: "selectDomInfo",
    default: null,
})
