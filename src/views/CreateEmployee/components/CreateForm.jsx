import { Input, Radio } from "antd";
import React, { Component } from "react";
import { Prompt, withRouter } from "react-router-dom";
import { Field, Form, reduxForm } from "redux-form/immutable";
import { PATHS } from "../../../appConstants";
import { Box, Flex } from "../../../em-web-ui/components/base";

const createFieldComp = (Comp) => {
  return ({ children, ...props }) => {
    const onChange = (args) => {
      props.input.onChange(args.target.value);
    };
    return (
      <Comp {...props.input} onChange={onChange}>
        {children}
      </Comp>
    );
  };
};

const RadioGroupCom = createFieldComp(Radio.Group);

const validate = (values) => {
  const newValues = values.toJS();
  const re = /\+65(6|8|9)\d{7}$/g;
  const errors = {};
  if (!newValues.firstName) {
    errors.firstName = "Please input first name";
  } else if (
    newValues.firstName.length > 10 ||
    newValues.firstName.length < 6
  ) {
    errors.firstName = "Must be more than 6 and less than 10";
  }
  if (!newValues.lastName) {
    errors.lastName = "Please input last name";
  } else if (newValues.lastName.length > 10 || newValues.lastName.length < 6) {
    errors.lastName = "Must be more than 6 and less than 10";
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
  } else if (!re.test(newValues.phoneNumber)) {
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
}) => {
  return (
    <Flex flexDirection="column">
      <Input
        {...input}
        placeholder={label}
        type={type}
        style={{
          width: width,
          border: touched && error ? "1px solid red" : "",
        }}
      />
      {touched &&
        ((error && <Box color="red">{error}</Box>) ||
          (warning && <span>{warning}</span>))}
    </Flex>
  );
};
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
  constructor(props) {
    super();
    this.state = { isSubmit: false, value: "male" };
  }
  componentDidMount() {
    this.handleInitialize();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.item !== this.props.item) {
      this.handleInitialize();
    }
  }
  handleInitialize() {
    const mappingData = {
      ...this.props.item,
      gender:
        this.props.item && this.props.item.gender === false ? "female" : "male",
    };
    console.log("mappingData", mappingData);
    this.props.initialize(mappingData);
  }

  handleSubmitForm = (values) => {
    const newItems = values.toJS();
    const gender = newItems.gender === "male" ? true : false;
    if (!!this.props.item) {
      this.props.onSubmit(this.props.item.id, {
        ...newItems,
        gender: gender,
      });
    } else {
      this.props.onSubmit({
        ...newItems,
        gender: gender,
      });
    }
    console.log(gender, {
      ...newItems,
      gender: gender,
    });
    this.setState({ isSubmit: true }, () => {
      // Todo Catch sucessed action to redirect
      this.props.history.push(PATHS.LIST);
    });
  };

  render() {
    const { handleSubmit, pristine, submitting, item } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Prompt
          when={!pristine && !this.state.isSubmit}
          message={() =>
            `Form has been modified. You will loose your unsaved changes. Are you sure you want to close this form?`
          }
        />
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
              component={RadioGroupCom}
              style={{ width: 120 }}
            >
              <Radio value={"male"}>Male</Radio>
              <Radio value={"female"}>Female</Radio>
            </Field>
          </Flex>
        </Flex>
        <Flex flex={1} justifyContent="flex-end">
          <button
            type="submit"
            disabled={!!item ? false : pristine || submitting}
          >
            {!!item ? "Edit Employee" : "Create Employee"}
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
