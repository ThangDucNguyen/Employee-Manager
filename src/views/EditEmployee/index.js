import { Breadcrumb, Layout } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { createStructuredSelector } from "reselect";
import { Flex } from "../../em-web-ui";
import { userActions, userSelectors } from "../../reduxResources/user";
import CreateForm from "../CreateEmployee/components/CreateForm";
import { SERVICE_API } from "../../appConstants";

const { Content, Footer, Sider } = Layout;

class EditEmployee extends Component {
  static proTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  componentDidMount() {
    const employeeId = this.props.match.params.id || "";
    this.props.getEmployee(employeeId);
  }

  render() {
    const { user } = this.props;
    return (
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Edit</Breadcrumb.Item>
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
                <CreateForm
                  onSubmit={this.props.editEmployee}
                  item={user ? user.toJS() : {}}
                />
              </Flex>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>Employee Manager</Footer>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: userSelectors.item,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployee: (id) => {
      dispatch(
        userActions.userGetAjax({
          url: `${SERVICE_API}/${id}`,
        })
      );
    },
    editEmployee: (id, data) => {
      dispatch(
        userActions.userUpdateAjax({ url: `${SERVICE_API}/${id}`, data })
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditEmployee));
