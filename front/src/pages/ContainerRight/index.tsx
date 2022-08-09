import { useRecoilState } from "recoil";
import store from "../../store";
import "./index.less";

const ContainerRight = () => {
  const [selectData, setSelectData] = useRecoilState(store.home.selectData);
  return (
    <div className="k-container-right">
      right
      {selectData?.key}
    </div>
  );
};

export default ContainerRight;
