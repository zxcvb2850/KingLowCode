// 获取随机KEY，组件拖到预览视图后就会被设置个KEY
const uuid = (): string => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4()
}

export default {uuid}