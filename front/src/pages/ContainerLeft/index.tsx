import React from "react";
import KButton from "../../components/Template/KingUi/KButton";
import "./index.less";

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
    </div>
  );
};

export default ContainerLeft;
