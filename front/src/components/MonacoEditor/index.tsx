import * as monaco from 'monaco-editor';
import { useEffect, useRef } from "react";
import "./index.less";

const MonacoEditor = () => {
    const monacoEditorEle = useRef<HTMLDivElement>(null);
    const monacoEidtorInstance = useRef<any>(null);
    useEffect(() => {
        if (!monacoEidtorInstance.current && monacoEditorEle.current) {
            monacoEidtorInstance.current = monaco.editor.create(monacoEditorEle.current, {
                value: "var a = 1; var b = 2;for (var i = 0;i<10;i++) {console.log(i)}",
                language: "javascript",
                readOnly: false,
                domReadOnly: false,
                automaticLayout: true, // 自动布局
                foldingStrategy: 'indentation', // 代码可分小段折叠
                overviewRulerBorder: false, // 不要滚动条的边框
                // lineNumbers: 'off', // 控制行号的出现on | off
                cursorStyle: 'line', // 光标样式
                minimap: { // 关闭小地图
                    enabled: false,
                },
                fontSize: 14, // 字体大小
                tabSize: 4, // tab缩进长度
            })
        }
    }, [monacoEditorEle]);

    // 返回代码内容
    const getCodeValue = (): string => {
        return monacoEidtorInstance.current.getValue();
    }

    // 格式化代码
    const formatDocument = () => {
        monacoEidtorInstance?.current.getAction(["editor.action.formatDocument"])._run();
    };
    return (
        <div className="monacor-editor-wrap" ref={monacoEditorEle} />
    )
}

export default MonacoEditor;