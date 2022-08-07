import { MouseEvent, useEffect } from 'react';
import './App.less';
import {useRecoilState} from "recoil";
import { domData } from './store/module/home';

function App(props: any) {
const [dom, setDom] = useRecoilState(domData);

useEffect(() => {
  console.log("domData", domData);
}, []);

useEffect(() => {
  console.log("effect text value", dom);
}, [dom]);

const handleClick = (e: MouseEvent<HTMLLIElement>) => {
  console.log("click", (e.target as HTMLLIElement).innerText);
  const text = (e.target as HTMLLIElement)?.innerText || "empty";
  // setText(`----${text}----`);

  setDom(<span>test</span>);
}

const handleClickTest = () =>{
}

  return (
    <div className="App">
      <h3 className='title'>{dom}</h3>
      <ul className='ul'>
        {[1,2,3,4].map(n => (
          <li key={n} className="li" onClick={handleClick}>{n}</li>
        ))}
      </ul>

      <p onClick={handleClickTest}>-TEST--TEST--TEST--TEST--TEST-</p>
    </div>
  );
}

export default App;
