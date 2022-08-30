import React from "react";
import {Divider, Collapse} from "antd";
import "./index.less";

const {Panel} = Collapse;

interface ComArrFace {
    type: string
    title: string
    components: {
        name: string
        data: string
    }[]
}

const componentsArray: ComArrFace[] = [
    {
        type: "basic", title: "基础组件", components: [
            {name: "按钮", data: "AButton"},
        ]
    },
    {
        type: "layout", title: "布局组件", components: [
            {name: "布局容器", data: "ALayout"},
            {name: "顶部布局", data: "AHeader"},
        ]
    },
    {
        type: "form", title: "表单组件", components: [
            {name: "输入框", data: "AInput"},
            {name: "警告提示", data: "AAlert"},
        ]
    }
];

const ContainerLeft = () => {
    const handleClick = () => {
    };

    // 拖拽开始
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        const componentName = (e.target as HTMLDivElement).dataset.name ?? "";
        const componentUi = (e.target as HTMLDivElement).dataset.ui ?? "";
        e.dataTransfer.setData("componentName", componentName); // 拖拽数据穿透
        e.dataTransfer.setData("componentUi", componentUi); // 拖拽数据穿透
    };

    // 拖拽结束
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("end event", e);
    };

    return (
        <div className="k-container-left">
            <Collapse accordion defaultActiveKey="basic">
                {componentsArray.map(item => (
                    <Panel header={item.title} key={item.type}>
                        <div className="component-thumb-wrap">
                            {item.components.map(c => (
                                <div
                                    key={c.name}
                                    className="item-component-example"
                                    data-name={c.data}
                                    draggable
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                >{c.name}</div>
                            ))}
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </div>
    );
};

export default ContainerLeft;
