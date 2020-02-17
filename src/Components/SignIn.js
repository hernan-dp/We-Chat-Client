/* global alert */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'
export default class SignIn extends Component {
  state = {
    username: null,
    password: null,
    firstname: null,
    lastname: null
  }

  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    return (
      alert('Logeado')
    )
  }

  render () {
    return (
      <div className='outer'>
        <div className='middle'>
          <div className='inner'>
            <div className='wrapper fadeInDown'>
              <div id='formContent'>
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                  <input type='text' id='username' className='fadeIn first' placeholder='Username' onChange={this.handleChange} />
                  <input type='password' id='password' className='fadeIn second' placeholder='Password' onChange={this.handleChange} />
                  <button type='submit' className='fadeIn third' onClick={this.handleSubmit}>Login</button>
                </form>
                <Link to='/auth/signup'>
                  Don't have an account? Create one!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
