/**
 * 生成 DOM 相关的数据
 * */
import {CustomReactPortal, CustomReactPortalChildren} from "../store/module/home";
import Utils from "./Utils";
import AntdUi from "../components/Template/AntdUi";
import KingUi from "../components/Template/KingUi";
import {DATA_COMPONENT_ACTIVE} from "./_Constant";
import PreRender from "../components/PreRender";
import loadsh from "lodash";

interface CreateDomFace {
    (name: string, ui?: string): CustomReactPortal
}

const CreateDom: CreateDomFace = (name, ui) => {
    console.log("name", name);
    console.log("ui", ui);
    let componentUi:any = "";
    switch (ui) {
        case "antd":
            componentUi = AntdUi;
            break;
        case "kingUi":
            componentUi = KingUi;
            break;
        case "virtual-dom": // 拖拽生成的虚拟 DOM
            componentUi = KingUi;
            break;
        default:
            componentUi = AntdUi
            break;
    }
    const dom = ui === "virtual-dom" ? PreRender : componentUi[name];
    const componentInfo = loadsh.cloneDeep(dom);
    // 此处的 componentInfo key 只有临时创建的站位 DOM 使用的
    const key = componentInfo?.key || Utils.uuid();
    console.log("componentInfo", componentInfo);
    // @ts-ignore
    const type = componentInfo.type;
    const tag = componentInfo.tag;
    const custom = componentInfo?.custom || {};
    custom[DATA_COMPONENT_ACTIVE] =  "true";
    const props = {...componentInfo.props};

    const children: CustomReactPortalChildren = componentInfo.children;

    const node: CustomReactPortal = {key, type, tag, props, custom, children};

    return node;
}

export default CreateDom;
