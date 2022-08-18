import {ReactNode} from "react";
import "./index.less";

interface KAlertFace  {
    children: ReactNode,
    custom?:any,
}

const KAlert = ({children, custom, ...props}: KAlertFace) => {
    props = {...custom, ...props};

    return (
        <div {...props} className={`k-alert-wrap`}>
            <span className="k-alert_content">{children}</span>
        </div>
    );
};

export default {
    type: KAlert,
    tag: "KAlert",
    ui: "kingUi",
    props: {},
    custom: {},
    children: "我是警告"
};
