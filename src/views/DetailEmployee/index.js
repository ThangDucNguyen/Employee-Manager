import { Breadcrumb, Layout } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { createStructuredSelector } from "reselect";
import { SERVICE_API } from "../../appConstants";
import { Flex } from "../../em-web-ui/components/base/index";
import { userActions, userSelectors } from "../../reduxResources/user";
import EmployeeDetailForm from "./component/EmployeeDetailForm";

const { Content, Footer, Sider } = Layout;
class EmployeeDetailContainer extends Component {
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
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0" }}>
            <Sider width={200}></Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Flex flex={1}>
                <EmployeeDetailForm item={user ? user.toJS() : {}} />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeDetailContainer));
