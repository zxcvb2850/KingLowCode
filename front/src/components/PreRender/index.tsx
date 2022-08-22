import Utils from "../../utils/Utils";
import "./index.less";

const PreRender = ({custom, ...props}: any) => {
    props = {...custom, ...props};
    return (<div {...props} className="pre-render-dom">preRender</div>)
}

export default {
    key: Utils.uuid(),
    type: PreRender,
    tag: "PreRender",
    props: {},
    children: null,
};