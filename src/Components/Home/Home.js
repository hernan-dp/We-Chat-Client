import React from 'react'
import home from './home.module.css'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import * as Storage from '../Storage'
import { client } from '../../index'

const CURRENT_USER = gql`
  query current_user{
  currentUser{
    id
    firstName
    lastName
    username
  }
}
`

export default function Home () {
  const history = useHistory()
  const { data, loading, error } = useQuery(CURRENT_USER)
  if (loading) return <p>Loading ..</p>
  if (error) return <p>ERROR</p>
  if (!data) return history.push('/auth/signin')

  function logout () {
    client.clearStore()
    Storage.removeToken()
    history.push('/auth/signin')
  }

  return (
    <div>
      <div className={home.outer}>
        <div className={home.middle}>
          <div className={home.inner}>
            <div className='wrapper fadeInDown'>
              <div id={home.formContent}>
                <h1 className='fadeIn first'>Welcome Back</h1>
                <h2>User Info:</h2>
                <h3>Username: {data.currentUser.username}</h3>
                <h3>First Name: {data.currentUser.firstName}</h3>
                <h3>Last Name: {data.currentUser.lastName}</h3>
                <h2 className={home.index}>id: {data.currentUser.id}</h2>
                <button className={home.chatbutton} onClick={()=>history.push('/chat')}>Chat!</button>
                <button className={home.button} onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
