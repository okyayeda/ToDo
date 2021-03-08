import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserConsumer from "../context"
// import axios from "axios";
import {Link} from "react-router-dom";


class User extends Component {
    state={
     isVisible: false
    }
    static defaultProps={
        name:"Bilgi yok",
        explanation:"Bilgi Yok",
        date:"Bilgi Yok",
    }
    onClickEvent=(e) => {
        this.setState({
            isVisible:!this.state.isVisible
        })

    }
    onDeleteUser=(dispatch,e)=>{
       const {id}=this.props;
    //    await axios.delete(`http://localhost:3000/users/${id}`);

           // Consumer Dispatch
       dispatch({type:"DELETE_USER",payload:id});
       

    }
    componentWillMount(){
        console.log("Component Will Mount");

    }
    render() {
         //destruction
    const{name,explanation,date,id}=this.props;
    const{isVisible}=this.state;
    return(
        <UserConsumer>{
            value=>{
               const {dispatch}=value;
                 return (
             <div className ="col-md-8 mb-2 " >
                <div className ="card" style={isVisible ? {backgroundColor:"#62848d", color:"white"}: null}>
                    <div className="card-header d-flex justify-content-between ">
                    <h4 className="d-inline" onClick = {this.onClickEvent}>{name}</h4>
                         <i onClick={this.onDeleteUser.bind(this,dispatch)} className=" far fa-trash-alt " style={{cursor:"pointer"}}></i>
                    </div>
                    {
                        isVisible ? <div className="card-body">
                
                <p className="card-text">Date: {date}</p>
                <p className="card-text">Explanation : {explanation}</p>
                <Link to = {`edit/${id}`} className = "btn btn-dark btn-block"> Update Todo </Link>
                </div> : null
                    }
                </div>
               
             </div>
        )
            }
            }

        </UserConsumer>
    )
       
    }
}

User.propType={
    name:PropTypes.string.isRequired,
    explanation:PropTypes.string.isRequired,
    date:PropTypes.string.isRequired,
    id:PropTypes.string.isRequired
    }
export default User;
