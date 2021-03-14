import React, {PureComponent } from "react";
import { Table, Divider, Layout, Breadcrumb, Space, Spin, Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { usersActions, usersSelectors } from 'reduxResources/users';
import Proptypes from 'prop-types';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { Flex,Box } from "../../em-web-ui/components/base/index";
import  {Link}  from 'react-router-dom';

const { Content, Footer, Sider } = Layout;


const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'lastName',
      key: 'lastName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'Gender',
      render: text => <a>{text ? 'Male' : 'Female'}</a>
    },
    {
      title: 'Email',
      key: 'emailAddress',
      dataIndex: 'emailAddress',
      render: text => <a>{text}</a>
    },
    {
      title:"Action",
      key:"action",
      render: (text, record) => (
        <span>
          <EditOutlined />
          <Divider type="vertical" />
          <DeleteOutlined />
        </span>
      )
    }
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
      if (isLoading) {
        return (
        <Space size="middle">
          <Spin size="large" />
        </Space>
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
                <Flex flex={1} justifyContent="flex-end">
                  <Box my={3}>
                    <Link to={`/create`}>
                      <Button type='primary'>Create Employee</Button>
                    </Link>
                  </Box>
                </Flex>
                <Table columns={columns} dataSource={users ? users.toJS() : []} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Employee Manager</Footer>
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
