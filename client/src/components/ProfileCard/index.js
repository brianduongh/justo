import React from "react";
import "./style.css";
import { Col, Image, Label } from "react-bootstrap";


function ProfileCard(props) {
  return (
    <Col className="p-card" xs={12} sm={12} md={6}>
      <div className="p-text">
        <p>Justo ID: {props.id}</p>
        <hr/>
        <p>Profession: {props.profession}</p>
        <hr/>
        <p>Rate: ${props.rate}/hour</p>
      </div>
    </Col>
  );
}

export default ProfileCard;
