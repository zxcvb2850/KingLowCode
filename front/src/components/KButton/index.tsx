import { ReactNode } from "react"
import "./index.less";

interface KButtonFace {
    children: ReactNode
    disabled?: boolean
    className?: string
    onClick?: () => void
}

const KButton = ({ children, disabled, className, onClick }: KButtonFace) => {
    return <button
        disabled={disabled}
        className={`k-button k-buton_default${className ? ` ${className}` : ""}`}
        onClick={onClick ? onClick : undefined}
    >{children}</button>
}

export default KButton;