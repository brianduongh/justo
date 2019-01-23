import React from "react";
// import "./style.css";
import { Image } from "react-bootstrap";

function ProfileCard(props) {

  return (
    <div className="f-card" xs={12} sm={12} md={4}>
        <button style={{ display:"block", textAlign:"center" }} id="upload-link" className="justo-button">Upload Profile Photo</button>
        <Image className="profile-sm" alt={props.name} src={props.image} circle />
    </div>
  );
}

export default ProfileCard;
