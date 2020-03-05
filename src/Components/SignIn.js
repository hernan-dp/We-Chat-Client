import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './Welcome.css'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const validation = Yup.object().shape({
  username: Yup.string()
    .max(10, 'Must be less than 10 caracters')
    .required('Enter your username'),
  password: Yup.string()
    .required('Must enter a password')
})

const SIGN_IN = gql`
  mutation sign_in($data: SigninInput!){
    signin(data: $data){
      user{
        id
      }
      jwt
    }
  }
`

export default function SignIn () {
  const [error, setError] = useState(null)

  const [signin] = useMutation(SIGN_IN, {
    onCompleted: LoginSuccess,
    onError: LoginFailed
  }
  )

  function LoginSuccess () {
    return (
      setError(false)
    )
  }

  function LoginFailed () {
    return (
      setError(true)
    )
  }

  return (
    <div className='outer'>
      <div className='middle'>
        <div className='inner'>
          <div className='wrapper fadeInDown'>
            <div id='formContent'>
              <h1>Sign In</h1>
              {error &&
                <h3 className='error'>  oh snap! Something went wrong  </h3>}
              {error === false &&
                <h3 className='correct'>  Log in successfully </h3>}
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true)
                  signin({
                    variables: {
                      data: values
                    }
                  })
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
