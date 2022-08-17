import React from "react";
import {Alert, Avatar, Badge, Button, Layout} from "antd";
import KButton from "../../components/Template/KingUi/KButton";
import "./index.less";
import AAlert from "../../components/Template/AntdUi/AButton";

const ContainerLeft = () => {
  const handleClick = () => {};

  // 拖拽开始
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const componentName = (e.target as HTMLDivElement).dataset.name ?? "";
    e.dataTransfer.setData("componentName", componentName); // 拖拽数据穿透
  };

  // 拖拽结束
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("end event", e);
  };

  return (
    <div className="k-container-left">
      <h2>组件</h2>
        <div
            className="item-component-example"
            data-name="KButton"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            按钮
        </div>
        <div
            className="item-component-example"
            data-name="KAlert"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            提示
        </div>
      <div className="component-example-wrap">
        <div
            className="item-component-example"
            data-name="AButton"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
          <Button type="primary">按钮</Button>
        </div>
        <div
            className="item-component-example"
            data-name="AAlert"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
          <Alert message={"提示"}/>
        </div>
        <div
            className="item-component-example"
            data-name="ABadge"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
          <Badge>
            <Avatar size="large" shape="square"/>
          </Badge>
        </div>
        <div
            className="item-component-example"
            data-name="ALayout"
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
          <Layout>Layout</Layout>
        </div>
      </div>
    </div>
  );
};

export default ContainerLeft;
