import KCollapsePanel from "./KCollapsePanel";

const KCollapse = (props: any) => {
  const getItems = () => {
    const { children } = props;
    console.log(children);
  };

  return <div className="k-collapse-wrap">折叠面板</div>;
};

KCollapse.Panel = KCollapsePanel;

export default KCollapse;
