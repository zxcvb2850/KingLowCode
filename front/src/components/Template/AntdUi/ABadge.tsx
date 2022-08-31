import {Badge} from "antd";
import {ReactNode} from "react";
import { DATA_COMPONENT_KEY} from "../../../utils/_Constant";

interface BadgeFace {
    children: ReactNode
    custom?: any
    [key: string]: any
}

const ABadge = ({children, custom, ...props}: BadgeFace) => {
    const customData:any = {};
    if (custom) {
        customData[DATA_COMPONENT_KEY] = custom[DATA_COMPONENT_KEY];
        delete props.custom;
    }

    return <span {...customData} style={custom.wrapStyle}>
        <Badge {...props}>{children}</Badge>
    </span>
}

export default {
    type: ABadge,
    tag: "ABadge",
    ui: "antd",
    props: {},
    children: [],
    custom: {
        wrapStyle: {
            display: "inline-block",
            minWidth: 50,
            minHeight: 50,
            backgroundColor: "rgba(0,0,0,.2)"
        },
        deepSize: 1,
    }
};
