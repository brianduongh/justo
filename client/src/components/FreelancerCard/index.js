import React from "react";
import "./style.css";
import { Image, Label } from "react-bootstrap";
import { Link } from "react-router-dom";


function FreelancerCard(props) {


  return (
    <div className="f-card" xs={12} sm={12} md={4}>

    {/* Upload Profile Photo button is visible only on the Account page */}
    {props.account ? <button style={{ display:"block", textAlign:"center" }} id="upload-link" className="justo-button">Upload Profile Photo</button> : <button style={{ display:"none"}}></button>}

    <Link to={"/account/"+props.id}>
      <Image className="profile-sm" alt={props.name} src={props.image} circle />
      <div className="f-text">
        <p>{props.name}</p>
        {!props.active ? <p><Label bsStyle="default">Idle</Label></p> : <p><Label bsStyle="success">Active{props.active}</Label></p>}
      </div>
    </Link>

    </div>
  );
}

export default FreelancerCard;
