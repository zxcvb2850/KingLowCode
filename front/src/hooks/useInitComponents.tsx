/**
 * 初始化主舞台组件列表
 */
import {useLayoutEffect, Fragment} from "react";
import { useRecoilState } from "recoil";
import store from "../store";
import KingUi from "../components/Template/KingUi";
import Utils from "../utils/Utils";

const useInitComponents = ()=>{
    const [, setSelectDom] = useRecoilState(store.home.selectorDomData);
    useLayoutEffect(()=>{
        setSelectDom([{
              key: Utils.uuid(),
              type: Fragment,
              tag: "Fragment",
              isCustomComponent: true,
              props: {},
              children: [{
                  key: Utils.uuid(),
                  type: KingUi.KAlert,
                  tag: "KAlert",
                  isCustomComponent: true,
                  props: {},
                  children: "Hello",
                }, {
                  key: Utils.uuid(),
                  type: KingUi.KButton,
                  tag: "KButton",
                  isCustomComponent: true,
                  props: {},
                  children: " World",
                }, {
                  key: Utils.uuid(),
                  type: KingUi.KButton,
                  tag: "KButton",
                  isCustomComponent: true,
                  props: {},
                  children: " World",
                }],
            }, {
              key: Utils.uuid(),
              type: "span",
              props: {"data-component-active": "false"},
              children: " !!!",
            }, {
              key: Utils.uuid(),
              type: "ul",
              props: {"data-component-active": "false"},
              isLoop: true,
              children: [{
                  key: Utils.uuid(),
                  type: "li",
                  props: { key: "a", "data-component-active": "false" },
                  children: 1,
                }, {
                  key: Utils.uuid(),
                  type: "li",
                  props: { key: "b", "data-component-active": "false" },
                  children: 2,
                }, {
                  key: Utils.uuid(),
                  type: "li",
                  props: { key: "c", "data-component-active": "false" },
                  children: 3,
                }, {
                  key: Utils.uuid(),
                  type: "li",
                  props: { key: "d", "data-component-active": "false" },
                  children: 4,
                }],
            }])
    }, []);

    return null;
}

export default useInitComponents;