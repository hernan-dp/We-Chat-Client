import React, {Component} from "react";
import { Link } from 'react-router-dom'
import "./Welcome.css"
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
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <h1>Member Registration</h1>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" id="firstname" className="fadeIn first" placeholder="FirstName" onChange={this.handleChange}/>
                  <input type="text" id="lastname" className="fadeIn second" placeholder="LastName" onChange={this.handleChange}/>
                  <input type="text" id="username" className="fadeIn third" placeholder="Username" onChange={this.handleChange}/>
                  <input type="text" id="password" className="fadeIn fourth" placeholder="Password" onChange={this.handleChange}/>
                  <button type="submit" className="fadeIn third" onClick={this.handleSubmit} >Sign up</button>
                </form>
                <Link to='/auth/signin'>
                  Do you already have a account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}