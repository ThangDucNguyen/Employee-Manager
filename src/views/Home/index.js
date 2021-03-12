import React, {PureComponent, useState } from "react";
import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { usersActions, usersSelectors } from 'reduxResources/users';
import Proptypes from 'prop-types';
// import { Flex } from "../../em-web-ui/components";
import { Layout, Menu, Breadcrumb } from 'antd';


const { Header, Content, Footer, Sider } = Layout;


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  

  class HomeContainer extends PureComponent {
    static propTypes = {
      requestUser: Proptypes.func.isRequired,
      users: Proptypes.array.isRequired,
    }
    componentDidMount() {
      this.props.requestUser();
    }
    render() {
      const { users, isLoading } = this.props;
      console.log('users', JSON.stringify(users));
      if (isLoading) {
        return (
          <div>isLoading</div>
        );
      }
  
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
                <Table columns={columns} dataSource={data} />
                {users && JSON.stringify(users)}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
      );
    }
  }

const mapStateToProps = createStructuredSelector({
  users: usersSelectors.items,
  isLoading: usersSelectors.isLoadingItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: () => {
      dispatch(usersActions.usersGetAllAjax({ url: 'https://604b3389ee7cb900176a18a4.mockapi.io/api/employees' }));
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
