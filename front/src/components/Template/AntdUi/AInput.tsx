import {Input} from "antd";

interface AInputFace {
    children: string
    custom: any,
}

const AInput = ({children, custom, ...props}: AInputFace) => {
    return <span {...custom} data-component-prevent-select="true">
        <Input {...props} value={children}/>
    </span>
}

export default {
    type: AInput,
    tag: "AInput",
    ui: "antd",
    props: {
        placeholder: "请输入内容",
    },
    custom: {},
    children: undefined,
};
