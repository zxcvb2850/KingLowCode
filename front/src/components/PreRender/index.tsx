import Utils from "../../utils/Utils";
import "./index.less";

const PreRender = () => {
    return (<div className="pre-render-dom">preRender</div>)
}

export default {
    key: Utils.uuid(),
    type: PreRender,
    tag: "PreRender",
    props: {},
    children: null,
};