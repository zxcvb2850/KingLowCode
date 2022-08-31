/**
 * 选中节点的渲染渲染边框
 * */
import {useRecoilValue} from "recoil";
import store from "../../store";
import "./index.less";

const SelectDomRender = () => {
    const selectDomInfo = useRecoilValue(store.select.selectDomInfo);

    return selectDomInfo ? <div className="component-select-box" style={selectDomInfo}/> : null;
}

export default SelectDomRender;
