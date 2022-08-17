import {Layout} from "antd";
import {ReactNode} from "react";
const {Header} = Layout;

interface HeaderFace {
    children: ReactNode
}

const AHeader = ({children, ...props}:HeaderFace) => {
    return <Header {...props}>{children}</Header>
}

export default {
    type: AHeader,
    tag: "AHeader",
    children: "Header",
};
