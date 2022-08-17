/**
 * 生成 DOM 相关的数据
 * */
import {CustomReactPortal, CustomReactPortalChildren} from "../store/module/home";
import Utils from "./Utils";
import AntdUi from "../components/Template/AntdUi";
import {DATA_COMPONENT_ACTIVE} from "./_Constant";

interface CreateDomFace {
    (name: string): CustomReactPortal
}

const CreateDom: CreateDomFace = (name: string) => {
    console.log("name", name);
    // @ts-ignore
    const componentInfo = AntdUi[name];
    const key = Utils.uuid();
    // @ts-ignore
    const type = componentInfo.type;
    const tag = componentInfo.tag;
    const props = {...componentInfo.props, [DATA_COMPONENT_ACTIVE]: "true"};

    const children: CustomReactPortalChildren = componentInfo.children;

    const node: CustomReactPortal = {key, type, tag, props, children};
    // custom
    if (componentInfo?.deepSize) {
        console.log("componentInfo", componentInfo.deepSize);
        node.deepSize = componentInfo.deepSize
    }
    return node;
}

export default CreateDom;
