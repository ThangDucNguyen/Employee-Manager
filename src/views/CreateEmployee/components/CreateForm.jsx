import React, { Component } from "react";
import { Field, reduxForm } from "redux-form/immutable";
import { Flex, Box } from "../../../em-web-ui/components/base";
import { Form } from "redux-form/immutable";
import { Input } from "antd";
import { Select } from "antd";
import { withRouter } from "react-router-dom";

const { Option } = Select;

const validate = (values) => {
  const newValues = values.toJS();
  const errors = {};
  if (!newValues.firstName) {
    errors.firstName = "Required";
  } else if (newValues.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }
  if (!newValues.email) {
    errors.email = "Required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  width,
  meta: { touched, error, warning },
}) => (
  <Flex flexDirection="column">
    <Input
      {...input}
      placeholder={label}
      type={type}
      style={{ width: width }}
    />
    {touched &&
      ((error && <Box color="red">{error}</Box>) ||
        (warning && <span>{warning}</span>))}
  </Flex>
);
const FieldComponent = ({
  label,
  fieldType,
  fieldName,
  id,
  placeholder,
  component,
}) => {
  return (
    <Flex flex={1} py={4}>
      <Box width={"300px"}>{label}:</Box>
      <Field
        name={fieldName}
        id={id}
        component={component}
        type={fieldType}
        label={placeholder}
        width={"600px"}
      />
    </Flex>
  );
};
class SyncValidationForm extends Component {
  componentDidMount() {
    this.handleInitialize();
  }
  handleInitialize() {
    const initData = {};
    this.props.initialize(initData);
  }

  handleSubmitForm = (values) => {
    const newItems = values.toJS();
    this.props.onSubmit({
      gender: true,
      ...newItems,
    });
    this.props.history.push("/");
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <FieldComponent
          label="First Name"
          fieldName="firstName"
          type="text"
          placeholder="First Name"
          component={renderField}
        />
        <FieldComponent
          label="Last Name"
          fieldName="lastName"
          type="text"
          placeholder="Last Name"
          component={renderField}
        />
        <FieldComponent
          label="Email"
          fieldName="email"
          type="email"
          placeholder="Email"
          component={renderField}
        />
        <FieldComponent
          label="Phone Number"
          fieldName="phoneNumber"
          type="phone"
          placeholder="Phone Number"
          component={renderField}
        />
        <Flex flex={1} py={4}>
          <Box width={"300px"}>Sex:</Box>
          <Flex>
            <Field
              name="gender"
              component={Select}
              style={{ width: 120 }}
              defaultValue={true}
            >
              <Option value={true}>Male</Option>
              <Option value={false}>Female</Option>
            </Field>
          </Flex>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <button type="submit" disabled={pristine || submitting}>
            Create Employee
          </button>
        </Flex>
      </Form>
    );
  }
}

const CreateForm = reduxForm({
  form: "CreateForm",
  validate,
});

export default withRouter(CreateForm(SyncValidationForm));
