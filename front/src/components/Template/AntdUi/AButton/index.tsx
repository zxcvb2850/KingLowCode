import {Button} from "antd";
import {ReactNode} from "react";

const AButton = ({children, ...props}: {children: ReactNode}) => {
    return <Button {...props}>{children}</Button>
}

export default AButton;
