import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import loadsh from "lodash";
import store from "../../store";
import "./index.less";
import { CustomReactPortal } from "../../store/module/home";
import Utils from "../../utils/Utils";

const ContainerRight = () => {
  const [selectorDomData, setSelectorDomData] = useRecoilState(
    store.home.selectorDomData
  );
  const selectData = useRecoilValue(store.home.selectData);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (selectData && !loadsh.isArray(selectData.children)) {
      setValue(`${selectData.children}`);
    }
  }, [selectData]);

  // 修改内容
  const changeValueContent = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    changeValue(val);
  };
  // 提交修改内容
  const changeValue = useCallback(
    loadsh.debounce((value: string) => {
      updateSelectorDom(value);
    }, 600),
    [selectData]
  );

  const updateSelectorDom = (val: string) => {
    if (!selectData) return;
    const copySelectorDom = loadsh.cloneDeep(selectorDomData);

    function loopDom(doms: CustomReactPortal[]): any {
      if (!selectData) return null;
      const len = doms.length;
      for (let i = 0; i < len; i++) {
        const item = doms[i];
        console.log("item", item);
        if (item.key === selectData.key) {
          item.children = val;
          break;
        } else if (Utils.isDomBase(item)) {
          item.children = item.children;
        } else {
          item.children = loopDom(item.children as CustomReactPortal[]);
        }
      }

      return doms;
    }
    const doms = loopDom(copySelectorDom);

    setSelectorDomData(copySelectorDom);
  };

  // 插入节点
  const insertSelectorDom = () => {}

  // 删除节点
  const deleteSelectorDom = () => {}

  // 查询节点
  const searchSelectorDom = (key: string): CustomReactPortal | null => {
    return null;
  }

  // 查询父节点
  const searchParentSelectorDom = () => {}

  // 修改节点
  const editParentSelectorDom = () => {}

  // 查询兄弟节点
  const searchBrotherSelector = () => {}

  return (
    <div className="k-container-right">
      right
      {selectData?.key}
      {selectData ? (
        Utils.isDomBase(selectData) ? (
          <div>
            <div>
              <h4>组件 {selectData.tag}</h4>
            </div>
            <span>value: </span>
            <input type="text" value={value} onChange={changeValueContent} />
          </div>
        ) : (
          <div>
            <h4>组件 {selectData.tag}</h4>
          </div>
        )
      ) : (
        <div>
          <h4>请选择组件</h4>
        </div>
      )}
    </div>
  );
};

export default ContainerRight;
