import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import * as Storage from './Components/Storage'
import { persistCache } from 'apollo-cache-persist'
import { ApolloLink } from 'apollo-link'
import 'bootstrap/dist/css/bootstrap.min.css'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: window.localStorage
})

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql'
})

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = Storage.getToken()
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })
  return forward(operation)
})

const link = middlewareLink.concat(httpLink)

export const client = new ApolloClient({
  cache,
  link
})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
