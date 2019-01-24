import React, { Component } from "react";
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import Navs from "../components/Nav"
import { Link } from "react-router-dom";

const styling ={
  display:'none'
}

function Login() {
  return(
    <div>
      <Navs page ="Login" style={styling}/>
      <div className="login-page">
        <form >
        <h1 style={{ textAlign:"center", fontSize:"16px", color:"#ECECEC", paddingBottom:"20px" }}>Login to your account to continue...</h1>
          <FormGroup>
            <FormControl
              type="email"
              placeholder="Email"
              />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              placeholder="Password"
              />
          </FormGroup>
          <Link to={"/dashboard"}><button className="justo-button" type="submit">Submit</button></Link>
        </form>
      </div>
    </div>
  )
}

export default Login;
