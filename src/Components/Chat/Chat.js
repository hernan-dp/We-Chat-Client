import React from 'react'
import styles from './Chat.module.css'

import {Row,Col,Container,Button,Navbar,Form} from 'react-bootstrap'
import {uuid} from 'uuid'

function Chat () {

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('not done yet')
  }

  return(
    <div className={styles.ChatGlobal}>
      <div className={styles.ChatText}>
        <Container className="w-100 d-flex bg-light page" style={{ height: "90vh", overflowX: "hidden" }}>
          <ul className="list-group" style={{ marginBottom: "60px" }}>
                    
          </ul>
        </Container>
      </div>

      <Navbar fixed="bottom">
        <Container>
          <Form
            inline
            className="w-100 d-flex justify-content-between align-items-center"
            onSubmit = {handleSubmit}
          >
            <Form.Group style={{ flex: 1 }}>
              <Form.Control
                style={{ width: "100%" }}
                required
                type="text"
                placeholder="Type Message here..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  )
} 

export default Chat
