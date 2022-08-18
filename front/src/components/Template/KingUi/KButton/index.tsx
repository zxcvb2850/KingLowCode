import {ReactNode} from "react";
import "./index.less";

interface KButtonFace {
    children?: ReactNode;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    custom?: any;

    [key: string]: any;
}

const KButton = ({children, disabled, className, onClick, custom, ...props}: KButtonFace) => {
    props = {...custom, ...props};

    return (
        <button
            disabled={disabled}
            className={`k-button k-buton_default${className ? ` ${className}` : ""}`}
            onClick={onClick ? onClick : undefined}
            {...props}
        >
            {children}
        </button>
    );
};

export default {
    type: KButton,
    tag: "KButton",
    ui: "kingUi",
    props: {},
    custom: {},
    children: "我是按钮",
};
