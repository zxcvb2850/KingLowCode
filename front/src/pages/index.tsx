import './index.less';
import ContainerLeft from './ContainerLeft';
import ContainerCenter from './ContainerCenter';
import ContainerRight from './ContainerRight';
import useInitComponents from '../hooks/useInitComponents';

function App(props: any) {
  useInitComponents();

  return (
    <div className="k-container-wrap">
      <ContainerLeft />
      <ContainerCenter />
      <ContainerRight />
    </div>
  );
}

export default App;
