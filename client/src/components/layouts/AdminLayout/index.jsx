import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import { PieChartOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button, Popover } from 'antd';
import logo from "@/assets/chashee.png"
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, path = '#', children) {
    return {
        key,
        path,
        icon,
        children,
        label,
    };
}

const content = (
    <div>
        <p>Logout!</p>
    </div>
);

const mainMenu = [
    getItem('Dashboard', '1', <PieChartOutlined />, '/'),
    getItem('Cultivation', 'sub1', <FontAwesomeIcon icon={faPagelines} />, '/cultivation',)
];

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className='w-full flex justify-center align-middle'>
                    <div className="w-full flex justify-between m-4 rounded-lg p-1 bg-[#ffffff2b]">
                        <img src={logo} alt='Chashee' className='w-10 flex m-auto' />
                    </div>
                </div>
                <Menu theme='dark' defaultSelectedKeys={['1']} mode="inline" >
                    {mainMenu.map(menu => (
                        <Menu.Item key={menu.key} icon={menu.icon}>
                            <Link to={menu.path}>{menu.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>

            </Sider>
            <Layout >
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className='w-full flex justify-end align-middle p-4'
                >
                    <div className='mr-4'>
                        <Popover content={content}>
                            <Button
                                type="success"
                                icon={<PoweroffOutlined />}
                                loading={loadings[2]}
                                onClick={() => enterLoading(2)}
                                className='bg-red-600 text-white rounded-full hover:bg-red-700 '
                            />
                        </Popover>
                    </div>
                </Header>
                <Content

                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Chashee ©2024 - {new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;