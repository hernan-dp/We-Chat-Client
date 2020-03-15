import React from 'react'
import './Welcome.css'
import gql from 'graphql-tag'
import { CachePersistor } from 'apollo-cache-persist'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import * as Storage from './Storage'

const cache = new InMemoryCache()
const persistor = new CachePersistor({ cache, storage: window.localStorage })

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
    persistor.pause()
    persistor.purge()
    Storage.removeToken()
    history.push('/auth/signin')
  }

  return (
    <div>
      <div className='outer'>
        <div className='middle'>
          <div className='inner'>
            <div className='wrapper fadeInDown'>
              <div id='formContent'>
                <h1 className='fadeIn first'>Welcome Back</h1>
                <h3 className='fadeIn first'>User Info:</h3>
                <h4 className='fadeIn second'>Username: {data.currentUser.username}</h4>
                <h4 className='fadeIn third'>First Name: {data.currentUser.firstName}</h4>
                <h4 className='fadeIn fourth'>Last Name: {data.currentUser.lastName}</h4>
                <h2>id: {data.currentUser.id}</h2>
                <button type='logout' onClick={logout}>Log Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
