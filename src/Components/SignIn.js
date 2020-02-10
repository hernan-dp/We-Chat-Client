import React, {Component} from "react";

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
    console.log(this.state.username, this.state.password);
    return(
      alert("Logeado")
    )
  }

  render(){
   
    return (
        <div>
          <h1>Member login</h1>
          <form onSubmit={this.handleSubmit}>
          <br/>
            <div>
            <label>
              <input placeholder="Usuario" type="text" id="username" onChange={this.handleChange}/>
            </label>
            </div>
            <div>
            <label>
              <input placeholder="Contraseña" type="password" id="password" onChange={this.handleChange}/>
            </label>
            </div>
            <button onClick={this.handleSubmit} >Iniciar sesión</button>
          </form>
        </div>
    )
  }
}



