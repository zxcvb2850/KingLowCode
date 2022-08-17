import {Badge} from "antd";
import {ReactNode} from "react";
import {DATA_COMPONENT_ACTIVE, DATA_COMPONENT_KEY} from "../../../utils/_Constant";

interface BadgeFace {
    children: ReactNode
    [key: string]: any
}

const ABadge = ({children, ...props}: BadgeFace) => {

    const customData:any = {};
    if (props.wrapStyle) {
        customData.style = props.wrapStyle;
        delete props.wrapStyle;
    }
    customData[DATA_COMPONENT_ACTIVE] = props[DATA_COMPONENT_ACTIVE];
    customData[DATA_COMPONENT_KEY] = props[DATA_COMPONENT_KEY];
    delete props[DATA_COMPONENT_ACTIVE];
    delete props[DATA_COMPONENT_KEY];

    return <span {...customData}>
        <Badge {...props}>{children}</Badge>
    </span>
}

export default {
    type: ABadge,
    tag: "ABadge",
    props: {
        wrapStyle: {
            display: "inline-block",
            minWidth: 50,
            minHeight: 50,
            backgroundColor: "rgba(0,0,0,.2)"
        }
    },
    children: [],
    deepSize: 1,
};
