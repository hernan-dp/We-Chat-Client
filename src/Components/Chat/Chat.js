import React from 'react'
import styles from './Chat.module.css'
import { Formik } from 'formik'
import { Container, Button, Navbar, Form } from 'react-bootstrap'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
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

  const [sendMessage] = useMutation(SEND_MESSAGE)
  const channel = 'test'

  return (
    <div className={styles.chatGeneral}>
      <div className={styles.ChatBox}>
        <Button variant='danger' className={styles.button} onClick={logout}>
          Log Out
        </Button>
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
              </Form>
            )}
          </Formik>
        </Container>
      </Navbar>
    </div>
  )
}
