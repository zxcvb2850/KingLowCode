import {ReactNode} from "react";
import {Layout} from "antd";

interface LayoutFace {
    children: ReactNode
    custom?: any,
}

const ALayout = ({children, custom, ...props}: LayoutFace) => {
    props = {...custom, ...props};
    return <Layout {...props}>{children}</Layout>
}

export default {
    type: ALayout,
    tag: "ALayout",
    ui: "antd",
    props: {},
    custom: {
        style: {minHeight: 50, padding: 20},
    },
    children: [],
};
