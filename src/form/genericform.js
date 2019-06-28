import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Field } from 'redux-form';
import { errorPropTypes } from './../helpers/proptype';
// import { Button } from 'reactstrap';

const GenericForm = ({ formSpec = [], errors = [], message = '', onSubmit, submitText }) => (
  <form className="form-group" onSubmit={onSubmit}>
    {formSpec.map(field => <div key={field.id}><Field {...field} /></div>)}
    <div className="my-2 d-flex justify-content-between align-items-center">
      <div className="form-check">
        <label className="form-check-label text-muted">
          <input type="checkbox" className="form-check-input"/> Keep me signed in
        </label>
      </div>
      <a href="#" className="auth-link text-black">Forgot password?</a>
    </div>
    <button type='submit' className='btn btn-info btn-block btn-flat margin-top-10'>
      {submitText}
    </button>
  </form>
);


GenericForm.propTypes = {
  onSubmit: PropTypes.func,
  formSpec: PropTypes.arrayOf(PropTypes.shape({
    placeholder: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    component: PropTypes.func,
  })),
  message: PropTypes.string,
  errors: errorPropTypes,
  submitText: PropTypes.string,
};
export default GenericForm;
