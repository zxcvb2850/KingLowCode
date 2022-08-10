import lodash from "lodash";

/**
 * 添加 clasName
 * @param className 当前的 class
 * @param target 需要添加的 class
 * @returns 
 */
export const addClassName = (className: string, target: string[]): string => { 
    let classNames: string[] = [];
    if (!!className) {
      className = className.trim();
      classNames = className?.split(" ") || []; // 查询原始 class
    }

    classNames = lodash.uniq([...target, ...classNames]); // 去重
    return classNames.join(" ");
};

/**
 * 移除 className
 * @param className 当前的 class
 * @param target 需要移除的 class 数组 
 * @returns 
 */
export const removeClassName = (className: string, target: string[]): string => {
    let classNames: string[] = [];
    if (!!className) {
      className = className.trim();
      classNames = className?.split(" ") || []; // 查询原始 class
    }

    classNames = classNames.filter((n) => !(target.indexOf(n) > -1));
    return classNames.join(" ");
};

/**
 * 获取所有的 class
 * @param className 当前的 class
 * @returns 
 */
export const getClassName = (className: string): string[] => {
    let classNames: string[] = [];
    if (!!className) {
      className = className.trim();
      classNames = className?.split(" ") || []; // 查询原始 class
    }

    return classNames;
};