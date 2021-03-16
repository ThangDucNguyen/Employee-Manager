import React, { Component } from "react";
import { Box, Flex } from "../../../em-web-ui/components/base";

const FieldValue = ({ label, value }) => {
  return (
    <Flex flex={1} p={"16px"}>
      <Box width={"300px"}>{label}:</Box>
      <Box>{value}</Box>
    </Flex>
  );
};
class EmployeeDetail extends Component {
  render() {
    const {
      item: { firstName, lastName, emailAddress, phoneNumber, gender },
    } = this.props;
    return (
      <Flex flexDirection="column">
        <FieldValue label="First Name" value={firstName} />
        <FieldValue label="Last Name" value={lastName} />
        <FieldValue label="Email" value={emailAddress} />
        <FieldValue label="Phone Number" value={phoneNumber} />
        <FieldValue label="Gender" value={gender ? "Male" : "Female"} />
      </Flex>
    );
  }
}

export default EmployeeDetail;
