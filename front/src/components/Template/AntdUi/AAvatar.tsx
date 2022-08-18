import {Avatar} from "antd";

const AAvatar = ({custom, ...props}: any) => {
    props = {...custom, ...props};
    return <Avatar {...props}/>
}

export default {
    type: AAvatar,
    tag: "AAvatar",
    props: {src: "https://joeschmoe.io/api/v1/random"},
    custom: {},
    children: null,
};
