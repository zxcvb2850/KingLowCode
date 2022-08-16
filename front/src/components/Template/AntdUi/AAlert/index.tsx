import {Alert} from "antd";
import {ReactNode} from "react";

const AAlert = ({children, ...props}: {children: ReactNode}) => {
    return <Alert {...props} message={children} />
}

export default AAlert;
