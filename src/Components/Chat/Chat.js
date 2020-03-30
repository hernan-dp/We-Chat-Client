import React from 'react'
import styles from './Chat.module.css'
import { Formik } from 'formik'
import { Container, Button, Navbar, Form } from 'react-bootstrap'
import { uuid } from 'uuid'
import gql from 'graphql-tag'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import SubsciptionComponent from './SubsciptionComponent'
import * as Storage from '../Storage'
import { client } from '../../index'
import { useHistory } from 'react-router-dom'

const SEND_MESSAGE = gql`
  mutation sendMessage($input: MessageInput!) {
    sendMessage(input: $input) {
      sender
      channel
      text
    }
  }
`

export default function Chat () {

  const history = useHistory()

  function logout () {
    client.clearStore()
    Storage.removeToken()
    history.push('/auth/signin')
  }

  const sendMessageOk = ({ sendMessage }) => {
    console.log('success')
  }
  const sendMessageError = (error) => {
    console.log(error)
  }

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: sendMessageOk,
    onError: sendMessageError
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('not done yet')
  }

  const channel = 'test'

  return (
    <div className={styles.ChatGlobal}>
      <div className={styles.ChatText}>
        <Container className='w-100 bg-light page' style={{ height: '85vh', overflowX: 'hidden' }}>
          <SubsciptionComponent channel={channel} />
        </Container>
      </div>

      <Navbar fixed='bottom'>
        <Container>
          <Formik
            initialValues={{ sender: Storage.getUsername(), channel: 'test', text: '' }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true)
              await sendMessage({ variables: { input: values } })
              resetForm()
              setSubmitting(false)
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
              <Form
                inline
                className='w-100 d-flex justify-content-between align-items-center'
                onSubmit={handleSubmit}
              >
                <Form.Group style={{ flex: 1 }}>
                  <Form.Control
                    name='text'
                    style={{ width: '100%' }}
                    required
                    type='text'
                    onChange={handleChange}
                    value={values.text}
                    placeholder='Type Message here...'
                  />
                </Form.Group>
                <Button variant='primary' type='submit' disabled={isSubmitting}>
                  Send
                </Button>
                <Button variant='primary' onClick={logout}>
                  Log Out
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </Navbar>
    </div>
  )
}
