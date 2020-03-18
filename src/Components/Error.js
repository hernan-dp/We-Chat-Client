import React from 'react'
import form from './form.module.css'

const Error = ({ touched, message }) => {
  if (!touched) {
    return <div className={form.invalid}>&nbsp;</div>
  }
  if (message) {
    return <div className={form.invalid}>{message}</div>
  }
  return <div className={form.valid}>All good</div>
}

export default Error
