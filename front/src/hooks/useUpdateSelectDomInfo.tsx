/**
 * 更新选中的 DOM 节点宽高左右边距
 * */
import {useRecoilState} from "recoil";
import store from "../store";
import {DATA_COMPONENT_KEY} from "../utils/_Constant";

const useUpdateSelectDomInfo = () => {
    const [, setSelectDomInfo] = useRecoilState(store.select.selectDomInfo);

    const updateSelect = (dom: string | HTMLElement | null) => {
        if (dom == null){
            setSelectDomInfo(null);
        } else if (typeof dom === "string") {
            // 如果是 string 则是 DOM 的 KEY
            const selDom: HTMLElement | null = document.querySelector(`[${DATA_COMPONENT_KEY}='${dom}']`);
            if (selDom) {
                const {offsetWidth, offsetHeight, offsetTop, offsetLeft} = selDom;
                setSelectDomInfo({width: offsetWidth, height: offsetHeight, top: offsetTop, left: offsetLeft});
            } else{
                setSelectDomInfo(null);
            }
        } else {
            const {offsetWidth, offsetHeight, offsetTop, offsetLeft} = dom;
            setSelectDomInfo({width: offsetWidth, height: offsetHeight, top: offsetTop, left: offsetLeft});
        }
    }

    return updateSelect;
}

export default useUpdateSelectDomInfo;
