import React from 'react'

import './App.module.css'
import { Switch, Route } from 'react-router-dom'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/SignUp/SignUp'
import Home from './Components/Home/Home'

function App () {
  return (
    <div className='App'>
      <Switch>
        <Route path='/auth/signup' component={SignUp} />
        <Route path='/auth/signin' component={SignIn} />
        <Route path='/home' component={Home} />
        <Route path='/' exact component={SignIn} />
      </Switch>
    </div>
  )
}

export default App
