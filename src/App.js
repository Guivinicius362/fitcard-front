import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//feito com antd
import Establishment from './containers/establishment/establishment';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
	render = () => {
		return (
			<Router>
				<Layout>
					<Header className="header" />
					<Layout>
						<Sider width={200} style={{ background: '#fff' }}>
							<Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
								<SubMenu
									key="sub1"
									title={
										<span>
											<Icon type="user" />
											Home
										</span>
									}
								>
									<Menu.Item key="1">Estabelecimento</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
						<Layout style={{ padding: '0 24px 24px' }}>
							<Content
								style={{
									background: '#fff',
									padding: 24,
									margin: '16px 0',
									minHeight: '100vh',
								}}
							>
								<Route path="/" exact component={() => <Establishment />} />
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</Router>
		);
	};
}
export default App;
