import {Button} from "antd";
import {ReactNode} from "react";

interface AButtonFace {
    children: ReactNode
    custom?: any,
    [key:string]: any
}

const AButton = ({children, custom, ...props}: AButtonFace) => {
    props = {...custom, ...props};
    return <Button {...props}>{children}</Button>
}

export default {
    type: AButton,
    tag: "AButton",
    ui: "antd",
    children: "确 定",
    custom: {},
};
