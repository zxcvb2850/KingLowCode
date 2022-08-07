import { useEffect } from 'react';
import './index.less';
import { useRecoilState } from "recoil";
import { domData } from '../store/module/home';
import ContainerLeft from './ContainerLeft';
import ContainerCenter from './ContainerCenter';
import ContainerRight from './ContainerRight';

function App(props: any) {
  const [dom, setDom] = useRecoilState(domData);

  useEffect(() => {
    console.log("domData", domData);
  }, []);

  useEffect(() => {
    console.log("effect text value", dom);
  }, [dom]);

  return (
    <div className="k-container-wrap">
      <ContainerLeft />
      <ContainerCenter />
      <ContainerRight />
    </div>
  );
}

export default App;
