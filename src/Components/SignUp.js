import React, {Component} from "react";
import { Link } from 'react-router-dom'

export default class SignUp extends Component{
  state = {
    username: null,
    password: null,
    firstname: null,
    lastname: null
  }
  
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.username, this.state.password, this.state.firstname, this.state.lastname);
    return(
      alert("Usuario Creado")
    )
  }

  render(){
    return (
        <div>
          <h2>Member registration</h2>
          <form onSubmit={this.handleSubmit}>
          <br/>
            <div>
              <label>
                <input placeholder="FirstName" type="text" id="firstname" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                <input placeholder="LastName" type="password" id="lastname" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                <input placeholder="Usuario" type="text" id="username" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                <input placeholder="Password" type="text" id="password" onChange={this.handleChange}/>
              </label>
            </div>
            <button onClick={this.handleSubmit} >Sign Up</button>
          </form>
          <div>
          <Link to='/auth/signin'>
              Do you already have a account?
          </Link>
          </div>
        </div>
    )
  }
}