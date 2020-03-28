import React from 'react'
import gql from 'graphql-tag'
import { useMutation, useSubscription } from '@apollo/react-hooks'

const SUBSCRIBE_MSG = gql`
subscription messageRecieved($channel: String!){
  message(channel: $channel){
    sender
    channel
    text
  }
}
`

function ListItem({message}){
  return <li>{message.text}</li>
}

function MessageList({messagelist}){
  const listItems= messagelist.map((message, index)=>
    <ListItem key={index} message={message} />
  )
  return(
    <ul>
      {listItems}
    </ul>
  )
}



export default function SubsriptionComponent ({channel}){
  const { data, loading } = useSubscription(
    SUBSCRIBE_MSG,
    { variables: { channel } }
  )
  let messagelist = []
  if(data){
    messagelist.push({sender: data.message.sender, text: data.message.text})
    console.log(messagelist)
    return (<MessageList messagelist={messagelist} />)
  }
  else{
    return (<h4>Start a chat</h4>)
  }
}
