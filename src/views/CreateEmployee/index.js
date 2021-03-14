import React, { Component } from 'react';
import { Table, Divider, Layout, Breadcrumb, Space, Spin, Button } from 'antd';
import { Flex,Box } from "../../em-web-ui/components/base/index";
import CreateForm from './components/CreateForm';

const { Content, Footer, Sider } = Layout;

class CreateEmployeeContainer extends Component {
  render() {
    return (
        <Layout>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={200}>
              Menu
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Flex flex={1}>
                    <CreateForm />
                </Flex>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Employee Manager</Footer>
      </Layout>
    );
  }
}

export default CreateEmployeeContainer;
