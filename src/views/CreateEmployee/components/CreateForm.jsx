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

  if (!newValues.emailAddress) {
    errors.emailAddress = "Please input email address";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newValues.emailAddress)
  ) {
    errors.emailAddress = "Invalid email address";
  }
  if (!newValues.phoneNumber) {
    errors.phoneNumber = "Please input phone number";
  } else if (/\+65(6|8|9)\d{7}/g.test(newValues.phoneNumber)) {
    errors.phoneNumber = "Invalid SG phone number";
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item !== this.props.item) {
      this.handleInitialize();
    }
  }
  handleInitialize() {
    this.props.initialize(this.props.item);
  }

  handleSubmitForm = (values) => {
    const newItems = values.toJS();
    if (!!this.props.item) {
      this.props.onSubmit(this.props.item.id, {
        gender: true,
        ...newItems,
      });
    } else {
      this.props.onSubmit({
        gender: true,
        ...newItems,
      });
    }

    // Todo Catch sucessed action to redirect
    this.props.history.push("/");
  };

  render() {
    const { handleSubmit, pristine, submitting, item } = this.props;
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
          fieldName="emailAddress"
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
          <Box width={"300px"}>Gender:</Box>
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
          <button
            type="submit"
            disabled={!!item ? false : pristine || submitting}
          >
            {!!item ? "Edit" : "Create Employee"}
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
