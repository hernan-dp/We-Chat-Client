import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'
import * as Storage from '../Storage'
import styles from './Chat.module.css'

const SUBSCRIBE_MSG = gql`
subscription messageRecieved($channel: String!){
  message(channel: $channel){
    sender
    channel
    text
  }
}
`

function ListItem ({ message }) {
  let alignment = 'flex-start'
  let messageStyle = styles.GuestMessage
  if (Storage.getUsername() === message.sender) {
    messageStyle = styles.HostMessage
    alignment = 'flex-end'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: alignment }}>
      <div className={messageStyle}>{message.sender}: <br />{message.text}</div>
    </div>
  )
}

function MessageList ({ messagelist }) {
  const listItems = messagelist.map((message, index) =>
    <ListItem key={index} message={message} />
  )
  return (
    <ul className={styles.ChatList}>
      {listItems}
    </ul>
  )
}

export default function SubsriptionComponent ({ channel }) {
  const [messageList, setMessageList] = useState([])
  const { data } = useSubscription(
    SUBSCRIBE_MSG, {
      variables: { channel },
      onSubscriptionData: ({ subscriptionData }) => {
        const message = {
          sender: subscriptionData.data.message.sender,
          text: subscriptionData.data.message.text
        }
        setMessageList(oldMessageList => [...oldMessageList, message])
      }
    })

  if (data) {
    return (<MessageList messagelist={messageList} />)
  } else {
    return (<h4>Start a chat</h4>)
  }
}
