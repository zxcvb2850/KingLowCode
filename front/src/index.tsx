import ReactDOM from 'react-dom/client';
import './index.less';
import Index from './pages';
import {RecoilRoot} from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <Index />
  </RecoilRoot>
);
