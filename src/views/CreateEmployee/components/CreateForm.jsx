import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Flex, Box } from '../../../em-web-ui/components/base';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)
const FieldComponent = ({label,fieldType, fieldName, id, placeholder, component}) =>{
    return (
      <Flex flex={1} p={'16px'}>
        <Box width={'300px'}>{label}:</Box>
        <Field
          name={fieldName}
          id={id}
          component={component}
          type={fieldType}
          placeholder={placeholder}
          width={'600px'}
        />
      </Flex>
    )
  }
const SyncValidationForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <FieldComponent
        label='First Name'
        fieldName='firstName'
        type='text'
        placeholder="First Name"
        component={renderField}
      />
     <FieldComponent 
        label='Last Name'
        fieldName='lastName'
        type='text'
        placeholder="Last Name"
        component={renderField}

      />
      <FieldComponent 
        label='Email'
        fieldName='email'
        type='email'
        placeholder="Email"
        component={renderField}

      />
      <FieldComponent 
        label='Phone Number'
        fieldName='phoneNumber'
        type='phone'
        placeholder="Phone Number"
        component={renderField}
      />
      <Flex flex={1} p={'16px'}>
        <Box width={'300px'}>Sex:</Box>
        <Flex>
         <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
         <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
        </Flex>
      </Flex>
      <Flex flex={1} justifyContent="flex-end" pr={'16px'}>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </Flex>
    </form>
  )
}


const form = reduxForm({
  form: 'CreateForm', 
  validate, 
  warn 
});

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(form(SyncValidationForm))