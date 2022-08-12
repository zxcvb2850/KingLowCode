/**
 * 组件 DOM 树处理
 */

import { CustomReactPortal } from '../store/module/home';

// 展开 DOM 树方便搜索和查找
export const expandTree = (dom: CustomReactPortal[]): CustomReactPortal[] => {
    const expand:CustomReactPortal[] = [];
    console.log("dom", dom);

    function expandArray (dom:CustomReactPortal[]) {
        const len = dom.length;
        for (let i = 0; i < len; i++) {
            const item = dom[i];
            expand.push(item);
            if (
                item.children &&
                Array.isArray(item.children) &&
                item.children.length
            ) {
                expandArray(item.children);
            }
        }
    }
    expandArray(dom);

    return expand;
};