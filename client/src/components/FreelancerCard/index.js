import React from "react";
import "./style.css";
import { Image, Label } from "react-bootstrap";


function FreelancerCard(props) {
  return (
    <div className="f-card" xs={12} sm={12} md={4}>
      <Image className="profile-sm" alt={props.name} src={props.image} circle />
      <div className="f-text">
        <p>{props.name}</p>
        {!props.active ? <p><Label bsStyle="default">Idle</Label></p> : <p><Label bsStyle="success">Active{props.active}</Label></p>}
      </div>
    </div>
  );
}

export default FreelancerCard;
