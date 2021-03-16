import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Box, Flex } from "../../../em-web-ui/components/base";
import { usersActions } from "../../../reduxResources/users";

const FieldValue = ({ label, value }) => {
  return (
    <Flex flex={1} p={"16px"}>
      <Box width={"300px"}>{label}:</Box>
      <Box>{value}</Box>
    </Flex>
  );
};
class EmployeeDetail extends Component {
  componentDidMount() {
    this.props.getEmployee("22");
  }

  render() {
    return (
      <Flex>
        <FieldValue label="First Name" />
        <FieldValue label="Last Name" />
        <FieldValue label="Email" />
        <FieldValue label="Phone Number" />
        <FieldValue label="Phone Number" />
      </Flex>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  // form: formReducer.CreateForm,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployee: (id) => {
      dispatch(
        usersActions.usersGetAjax({
          url: `https://604b3389ee7cb900176a18a4.mockapi.io/api/employees/${id}`,
        })
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
