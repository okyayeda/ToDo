import React, { Component} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import AddTodo from "./components/AddTodo";
import UpdateTodo from "./components/UpdateTodo";
import Users from "./components/Users";

import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {

  render() {
    
    return (
      <Router>
          <div className="container">
          
         <Navbar title = "TODO APP " className="flex-center"/>
          <hr/>
          
          <Switch>
            <Route exact path = "/" component = {Users} />
            <Route exact path = "/add" component = {AddTodo} />
            <Route exact path = "/edit/:id" component = {AddTodo} />
          
          </Switch>
          
          
       
          

        </div>
      </Router>
    )
  }
}
export default App;
