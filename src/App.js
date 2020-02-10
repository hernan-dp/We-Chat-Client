import React from 'react';

import './App.css';
import { Switch, Route} from 'react-router-dom'
import SignIn from './Components/SignIn'
import SignUp from './Components/SignUp'

function App() {
  return (
    <div className="App">
     <SignIn> </SignIn> 
      <Switch>
          <Route exact path='/auth/signin' component={ SignIn }/>
          <Route exact path='/auth/signup' component={ SignUp }/>
      </Switch>
    </div>
  );
}

export default App;
