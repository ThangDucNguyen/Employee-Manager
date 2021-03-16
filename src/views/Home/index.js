import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Divider, Layout, Table } from "antd";
import Proptypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { usersActions, usersSelectors } from "reduxResources/users";
import { createStructuredSelector } from "reselect";
import { SERVICE_API } from "../../appConstants";
import { Box, Flex } from "../../em-web-ui/components/base/index";
import ConfirmModal from "./component/DeleteModal";

const { Content, Footer, Sider } = Layout;

class HomeContainer extends PureComponent {
  static propTypes = {
    requestUser: Proptypes.func.isRequired,
    users: Proptypes.array.isRequired,
  };
  componentDidMount() {
    this.props.requestUser();
  }
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { users, isLoading } = this.props;
    const columns = [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "Gender",
        render: (text) => <a>{text ? "Male" : "Female"}</a>,
      },
      {
        title: "Email",
        key: "emailAddress",
        dataIndex: "emailAddress",
        render: (text) => <a>{text}</a>,
        responsive: ["md"],
      },
      {
        title: "Actions",
        key: "action",
        render: (_text, record) => {
          return (
            <span>
              <Flex>
                <Box>
                  <Link to={`/edit/${record.id}`}>
                    <EditOutlined />
                  </Link>
                </Box>
                <Divider type="vertical" />
                <Box onClick={() => ConfirmModal(record)}>
                  <DeleteOutlined />
                </Box>
              </Flex>
            </span>
          );
        },
      },
    ];

    return (
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              Menu
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Flex flex={1} justifyContent="flex-end">
                <Box my={3}>
                  <Link to={`/create`}>
                    <Button type="primary">Add</Button>
                  </Link>
                </Box>
              </Flex>
              <Table
                loading={this.props.isLoading}
                columns={columns}
                dataSource={users ? users.toJS() : []}
              />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Employee Manager</Footer>
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
      dispatch(
        usersActions.usersGetAllAjax({
          url: SERVICE_API,
        })
      );
    },
    deleteUser: (id) => {
      dispatch(
        usersActions.usersDeleteAjax({
          url: `${SERVICE_API}/${id}`,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
