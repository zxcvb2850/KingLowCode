import {ReactNode} from "react";
import {Layout} from "antd";

interface LayoutFace {
    children: ReactNode
}

const ALayout = ({children, ...props}: LayoutFace) => {
    return <Layout {...props}>{children}</Layout>
}

export default {
    type: ALayout,
    tag: "ALayout",
    props: {style: {minHeight: 50, padding: 20}},
    children: [],
};
