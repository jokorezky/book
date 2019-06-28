import React from 'react';
import {
  required,
  maxLength,
  maxLength15,
  minLength,
  minLength2,
  number,
  minValue,
  minValue18,
  email,
  tooOld,
  aol,
  alphaNumeric,
  phoneNumber
} from './manifests';

export const renderField = ({
  input,
  label,
  subtitle,
  placeholder,
  type,
  id,
  meta: {
    touched,
    error,
    warning
  }
}) => (<div className="form-group">
  <label className="field-label" htmlFor={id}>{label}</label>
  {subtitle ? (<span><small style={{color: '#969393d1'}}> {subtitle}</small></span>):('')}
  <div className={type}>
    <input {...input} id={id} className="form-control" placeholder={placeholder} type={type}/> {touched && ((error && <span className="errortext">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div>)

export const renderFieldImg = ({
  input,
  label,
  subtitle,
  type,
  id,
  meta: {
    touched,
    error,
    warning
  }
}) => (<div className="form-group">
  <label className="field-label" htmlFor={id}>{label}</label>
  {subtitle ? (<span><small style={{color: '#969393d1'}}> {subtitle}</small></span>):('')}
  <div className={type}>
    <input {...input} id={id} className="form-control" placeholder={label} type={type} value={undefined}/> {touched && ((error && <span className="errortext">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div>)


export const renderChaeckBox = ({
  input,
  label,
  type,
  id,
  meta: {
    touched,
    error,
    warning
  }
}) => (<div className="form-group">

  <div className={type}>
    <input {...input} id={id} className="form-control" placeholder={label} type={type}/>
    <label className="field-label" htmlFor={id}>{label}</label>
    {touched && ((error && <span className="errortext">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div>)

export const renderSelectBox = ({
  input,
  label,
  type,
  id,
  field,
  options,
  meta: {
    touched,
    error,
    warning
  }
}) => (<div className="form-group">
  <div className={type}>
    <label className="field-label" htmlFor={id}>{label}</label>
    <select {...input} id={id} className="form-control" type={type}>
      {options.map((option, index) =>(
        <option key={index} value={option.value}>{option.title}</option>
      ))}

    </select>
    {touched && ((error && <span className="errortext">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div>)

export const nolabelRenderField = ({
  input,
  label,
  type,
  id,
  rowcol,
  divcol,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className="form-group">
  <input {...input} id={id} className="form-control" placeholder={label} type={type}/> {touched && ((error && <span className="errortext">{error}</span>) || (warning && <span>{warning}</span>))}
</div>)

export const nolabelRenderSelectBox = ({
  input,
  label,
  type,
  id,
  field,
  options,
  disable,
  meta: {
    touched,
    error,
    warning
  }
}) => (
  <div className="form-group">


  <div className={type}>
    <select {...input} id={id} className="form-control" type={type}>
      {options.map((option, index) => (<option key={index} value={option.value} disabled={option.disable} defaultChecked={option.disable}>{option.title}</option>))}
    </select>
    {touched && ((error && <span className="errortext">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
</div>)
