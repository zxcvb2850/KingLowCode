import './index.less';
import ContainerLeft from './ContainerLeft';
import ContainerCenter from './ContainerCenter';
import ContainerRight from './ContainerRight';
import useInitComponents from '../hooks/useInitComponents';
import {Button, Layout, Divider} from 'antd';
import SelectDomRender from "../components/SelectDomRender";

const {Header, Sider, Content, Footer} = Layout;

function App(props: any) {
    useInitComponents();

    return (
        <div className="k-container-wrap">
            <Layout>
                <Header className="header">
                    <div className="logo-wrap">King Low Code</div>
                    <div className="header-btn">
                        <Button>预览</Button>
                        <Divider type="vertical"/>
                        <Button>导出</Button>
                    </div>
                </Header>
                <Layout>
                    <Sider className="container-left-wrap"><ContainerLeft/></Sider>
                    <Content className="container-content-wrap">
                        <ContainerCenter/>
                        <SelectDomRender/>
                    </Content>
                    <Sider className="container-right-wrap"><ContainerRight/></Sider>
                </Layout>
                <Footer className="footer">@king</Footer>
            </Layout>
        </div>
    );
}

export default App;
