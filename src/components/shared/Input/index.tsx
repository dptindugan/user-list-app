import React from 'react'
import './input.css'

export type InputType = {
  label: string
  name: string
  [arg: string]: any
} 

const Input: React.FC<InputType> = ({ label, name, ...props }) => {
  return (
    <label className='input-wrapper' htmlFor={name}>
      <input {...props} name={name} id={name} placeholder=' ' />
      <span className='label'>{label}</span>
    </label>
  );
}

export default Input