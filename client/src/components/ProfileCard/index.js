import React from "react";
// import "./style.css";
import { Image } from "react-bootstrap";
import Upload from "../Upload"

function ProfileCard(props) {

  return (
    <div className="f-card" xs={12} sm={12} md={4}>
        <button style={{ display:"block", textAlign:"center" }} id="upload-link" className="justo-button">Upload Profile Photo</button>
        {/* <Upload id={this.state.user_id} />
        <Upload id ={props.id}/> */}

        <Image className="profile-sm" alt={props.name} src={props.image} circle />
    </div>
  );
}

export default ProfileCard;
