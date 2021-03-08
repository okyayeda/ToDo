import React, { Component } from 'react'
import posed from 'react-pose'
import UserConsumer from "../context"
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./AddTodo.css"
import {Link} from "react-router-dom";

const uniqid = require('uniqid')
const Animation = posed.div({//Animasyon için Değişken
    visible: {
        opacity: 1,
        applyAtStart: {
            display: "block"
            
        }
    },
    hidden: {
        opacity: 0,
        applyAtEnd: {
            display:"none"
        }
    }
  });

class AddTodo extends Component {
    state = {
       
         name :"",
        explanation :"",
        date : "",
        error : false
   
    } 
    
    changeVisibility = (e) => {
        this.setState ( {
            visible : !this.state.visible
        })
    }
    changeInput = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
      
    }
    AddTodo = (dispatch,e) => {
        e.preventDefault();
        const { name, explanation, date } = this.state;
        const newuser = {
            name,
            explanation,
            date,
        } 
        console.log(newuser)
        
        if (!this.validateForm){
            this.setState({
                error:false
            })
            return;
        }
        async function asyncFunc(newUser) {
            
         const response = await axios.post("http://localhost:3004/users",{newUser});
         return response;
        }


        dispatch({ type: "ADD_TODO", payload: newuser });
        this.props.history.push("/");

    }
   
    render() {
        const { visible, name, explanation, date,error } = this.state
        return(
        <UserConsumer>
            {
                value => {
                    const { dispatch } = value;
                    return (
                        
                        <div className="container d-flex">
                       <div className='w-75'>
                            <button onClick={this.changeVisibility} className="btn btn-warning w-100 mb-2">{visible ? "Hide ToDo" : "Show ToDo"}</button>
                            <Animation pose={visible ? "visible" : "hidden"}>
                                <div className="card" style={visible ? { backgroundColor: "#FFF59D", color: "dark" }: null}>
                                <div className="card-header"> 
                                    <h4>Add ToDo List</h4>
                                </div>
                                <div className="card-body">
                                {
                            error ? 
                            <div className = "alert alert-danger">
                               Lütfen bilgilerinizi kontrol edin.
                            </div>
                            :null
                         }
                                    <form onSubmit={this.AddTodo.bind(this,dispatch)}>
                                        <div className="form-group">
                                            <label htmlFor="name" className="mb-2">ToDo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                placeholder="Enter ToDo"
                                                    className="form-control"
                                                    value={name}
                                                    onChange ={this.changeInput}
                                            />
                                            
            
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="explanation" className="mb-2">Explanation</label>
                                            <input
                                                type="text"
                                                name="explanation"
                                                id="explanation"
                                                placeholder="Enter Explanation"
                                                    className="form-control"
                                                    value={explanation}
                                                    onChange ={this.changeInput}
                                            />
                                            
            
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="date" className="mb-2" >Date</label>
                                            <input
                                                type="text"
                                                name="date"
                                                id="date"
                                                placeholder="Enter Date"
                                                className ="form-control"
                                                    value={date}
                                                    onChange ={this.changeInput}
                                                />
                                            
            
                                        </div>
                                
                                        <button type = "submit" className="btn btn-success mt-4 w-100">Add ToDo</button>
                                    </form>
                                </div>
                            </div>
                            </Animation>
                            </div>
                             <div className="calendar__container">
                                   <Calendar />
                          </div>
          
                           
                        </div>
                    )
                }
            }
        </UserConsumer>
        )
    }
}
export default AddTodo;
