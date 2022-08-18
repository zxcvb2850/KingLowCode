import {Layout} from "antd";
import {ReactNode} from "react";

const {Header} = Layout;

interface HeaderFace {
    children: ReactNode
    custom?: any
}

const AHeader = ({children, custom, ...props}: HeaderFace) => {
    props = {...custom, ...props};
    return <Header {...props}>{children}</Header>
}

export default {
    type: AHeader,
    tag: "AHeader",
    ui: "antd",
    children: [],
};
