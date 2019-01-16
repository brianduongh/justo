import React from "react";
import "./style.css";
import { Col } from "react-bootstrap";


function ProfileCard(props) {
  return (
    <div>
      <div className="p-card">
        <div className="p-text">
          <p>
            <strong>Justo ID: </strong>
            #{props.id}
          </p><hr/>
          <p>
            <strong>Profession: </strong> 
            {props.profession}
          </p><hr/>
          <p>
            <strong>Project Hours: </strong>
          </p><hr/>
          <p>
            <strong>Rate/hour: </strong>
            ${props.rate}
          </p><hr/>
          <p>
            <strong>Pay Accrued: </strong>
          </p>
        </div>
      </div>
      <div>
        <button className="justo-button">Make Payment</button>
        <button className="justo-button">Request Screen Share</button>
      </div>
    </div>
  );
}

export default ProfileCard;
