import KButton from "../../components/Template/KingUi/KButton";
import "./index.less";

const ContainerLeft = () => {
  const handleClick = () => {};
  return (
    <div className="k-container-left">
      left
      <KButton onClick={handleClick}>我是按钮</KButton>
    </div>
  );
};

export default ContainerLeft;
