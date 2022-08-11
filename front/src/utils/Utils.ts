import { CustomReactPortal } from '../store/module/home';

// 获取随机KEY，组件拖到预览视图后就会被设置个KEY
const uuid = (): string => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4()
}

// 该节点是否有子节点，
// 子节点是否是基础类型
const isDomBase = (dom: CustomReactPortal | null): boolean => {
    if (!dom || dom.children == null) return false;
    if (typeof dom.children === "string" || typeof dom.children === "number") return true;

    return false;
}


export default {uuid, isDomBase}