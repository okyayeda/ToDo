
import React, { Component } from 'react'
import UserConsumer from "../context";
 import axios from "axios";



class UpdateTodo extends Component {

  state = {array : [{name : "",
  explanation :"",
  date : "",
  error : false}]}
      
  
   
  changeInput = (e) => {
      this.setState({
          
          [e.target.name] : e.target.value
      })
  }
  componentDidMount = async () => {
    const {id} = this.props.match.params;
    
    const response = await axios.get(`http://localhost:3004/users/${id}`);

    const {name,explanation,date} = response.data;

    this.setState({
        name,
        
        explanation,
        
        date
    });

  }
  validateForm = () => {
    const {name,explanation,date} = this.state;
    if (name === "" ||  explanation === "" || date === "") {
        return false;
    }
    return true;
    
}
  UpdateTodo = async (dispatch,e) => {
      e.preventDefault();

      // Update Todo
      const {name,explanation,date} = this.state;
      const {id} = this.props.match.params;
      const UpdateTodo = {
        name,
        date,
        explanation
      };
      if (!this.validateForm()) {
        this.setState({
            error :true
        })
        return;
        }
    const response = await axios.put(`http://localhost:3004/users/${id}`,UpdateTodo);

      dispatch({type: "UPDATE_TODO",payload : response.data});

      // Redirect
      this.props.history.push("/");
  } 
  render() {
    const {name,explanation,date,error} = this.state;
    return <UserConsumer>
        {
            value => {
                const {dispatch} = value;
                return (
     
                    <div className = "col-md-8 mb-4">
              
                      
            
                      <div className="card">
                          <div className="card-header">
                          <h4>Update Todo Form</h4>
                          </div>
                          <div className="card-body">
                          {
                            error ? 
                            <div className = "alert alert-danger">
                               Lütfen bilgilerinizi kontrol edin.
                            </div>
                            :null
                         }
                              {/* <form onSubmit = {this.UpdateTodo.bind(this,dispatch)}>
                                  <div className="form-group">
                                      <label htmlFor="name">ToDo</label>
                                      <input 
                                      type="text"
                                      name = "name"
                                      id = "id"
                                      placeholder = "Enter ToDo"
                                      className ="form-control"
                                      value = {name}
                                      onChange = {this.changeInput}
              
                                      />
                                  
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="Explanation">Explanation</label>
                                      <input 
                                      type="text"
                                      name = "explanatin"
                                      id = "explanation"
                                      placeholder = "Enter Explanation"
                                      className ="form-control"
                                      value = {explanation}
                                      onChange = {this.changeInput}
                                      />
                                  
                                  </div>
                                 
                                  <div className="form-group">
                                   <label htmlFor="Date">Date</label>
                                   <input
                                      type="text"
                                      name = "date"
                                      id = "date"
                                      placeholder = "Enter Date"
                                      className ="form-control"
                                      value = {date}
                                      onChange = {this.changeInput}
                                      />
                                  </div>
                                  
                                 
                                  <button className = "btn btn-sucsess btn-block" type = "submit">Update Todo</button>
                              
                              
                              </form> */}
                          </div>
                      
                      </div>
                      
                    </div>
                  )
            }
        }
    
    </UserConsumer>
    
    
    
    
    
  }
}

export default UpdateTodo;