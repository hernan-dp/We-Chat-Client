/* global alert */
import React from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './Welcome.css'

const validation = Yup.object().shape({
  username: Yup.string()
    .max(10, 'Must be less than 10 caracters')
    .required('Enter your username'),
  password: Yup.string()
    .required('Must enter a password')
})

export default function SignIn () {
  return (
    <div className='outer'>
      <div className='middle'>
        <div className='inner'>
          <div className='wrapper fadeInDown'>
            <div id='formContent'>
              <h1>Sign In</h1>
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true)
                  alert(JSON.stringify({ values }))
                  resetForm()
                  setSubmitting(false)
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <input
                      type='text'
                      id='username'
                      className='fadeIn first'
                      placeholder='Enter your username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <input
                      type='password'
                      id='password'
                      className='fadeIn second'
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <button
                      type='submit'
                      className='fadeIn third'
                      disabled={isSubmitting}
                    >Login
                    </button>
                  </form>
                )}
              </Formik>
              <Link to='/auth/signup'>
                  Don't have an account? Create one!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
