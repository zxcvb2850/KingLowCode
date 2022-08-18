import {Alert} from "antd";
import {ReactNode} from "react";

interface AAlertFace {
    children: ReactNode
    custom?:any,
}

const AAlert = ({children, custom, ...props}: AAlertFace) => {
    props = {...custom, ...props};
    return <Alert {...props} message={children}/>
}

export default {
    type: AAlert,
    tag: "AAlert",
    ui: "antd",
    children: "提示文案",
};
