import { Breadcrumb, Layout } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { SERVICE_API } from "../../appConstants";
import { Flex } from "../../em-web-ui/components/base/index";
import { usersActions } from "../../reduxResources/users";
import CreateForm from "./components/CreateForm";

const { Content, Footer, Sider } = Layout;

class CreateEmployeeContainer extends Component {
  render() {
    const { isLoading, error } = this.props;
    return (
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              Menu
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Flex flex={1}>
                <CreateForm onSubmit={this.props.createEmployee} />
              </Flex>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Employee Manager</Footer>
      </Layout>
    );
  }
}
const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => {
  return {
    createEmployee: (data) => {
      dispatch(
        usersActions.usersInsertAjax({
          url: SERVICE_API,
          data,
        })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEmployeeContainer);
