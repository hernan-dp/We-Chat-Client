import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './Welcome.css'
import gql from 'graphql-tag'

const validation = Yup.object().shape({
  firstName: Yup.string()
    .max(12)
    .required('Must enter name'),
  lastName: Yup.string()
    .max(12)
    .required('Must enter name'),
  username: Yup.string()
    .max(10, 'Must be less than 10 caracters')
    .required('Enter your username'),
  password: Yup.string()
    .required('Must enter a password')
    .min(5, 'Must be atleast longer than 5 characters')
})

const SIGN_UP = gql`
  mutation sign_up($data: SignupInput!){
    signup(data: $data){
      user{
        id
        username
      }
      jwt
    }
  }
`

function SignUp () {
  const [error, setError] = useState(null)
  const [signup] = useMutation(SIGN_UP, {
    onCompleted: RegistrationSuccess,
    onError: RegistrationFailure
  }
  )

  function RegistrationFailure () {
    return (
      setError(true)
    )
  }

  function RegistrationSuccess () {
    return (
      setError(false)
    )
  }

  return (
    <div className='outer'>
      <div className='middle'>
        <div className='inner'>
          <div className='wrapper fadeInDown'>
            <div id='formContent'>
              <h1>Member Registration</h1>
              {error &&
                <h3 className='error'>  oh snap! Something went wrong  </h3>}
              {error === false &&
                <h3 className='correct'>  User created successfully  </h3>}
              <Formik
                initialValues={{ firstName: '', lastName: '', username: '', password: '' }}
                validationSchema={validation}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setSubmitting(true)
                  await signup({
                    variables: {
                      data: values
                    }
                  })
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
                      id='firstName'
                      className='fadeIn first'
                      placeholder='FirstName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    <input
                      type='text'
                      id='lastName'
                      className='fadeIn second'
                      placeholder='LastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    <input
                      type='text'
                      id='username'
                      className='fadeIn third'
                      placeholder='Username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <input
                      type='password'
                      id='password'
                      className='fadeIn fourth'
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <button
                      type='submit'
                      className='fadeIn third'
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                  </form>
                )}
              </Formik>
              <Link to='/auth/signin'>
                  Do you already have a account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
