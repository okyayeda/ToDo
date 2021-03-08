import React from 'react'
import PropTypes from "prop-types";
 import {Link} from "react-router-dom";
 import Logo from "./robinhood.svg";
import './Navbar.css'


 function Navbar({title}) {
  
  return (
  
    <nav className="navbar-nav navbar-expand-lg navbar-dark bg-dark  p-1">
   
    <div className="navbar__container">
     <img src={Logo} width={40}/> 
     <a href="/" className="navbar-brand m-3">{title}</a>
     </div>
     <ul className="navbar-nav ml-auto justify-content-lg-end mb-2">
        <li className="nav-item active ">
          <Link to = "/"  className = "nav-link">Home</Link>
        </li>
        <li className="nav-item active">
          <Link to = "/add" className = "nav-link">Add Todo</Link>
       </li>
       <li className="nav-item active">
          <Link to = "https://github.com/okyayeda" className = "nav-link">GitHub</Link>
       </li>
      </ul> 
    
    
    
    </nav>

    
  )
}
Navbar.propTypes = {
  title : PropTypes.string.isRequired
}
Navbar.defaultProps = {
  title : "Default App"
}
export default Navbar;