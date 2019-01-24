import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function ProfileTracker(props) {
    
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
                        {props.hours}:{props.minutes}:{props.seconds}
                        </p><hr/>
                        <p>
                        <strong>Rate/hour: </strong>
                        ${props.rate}
                        </p><hr/>
                        <p>
                        <strong>Pay Accrued: </strong>
                        ${(props.payAmount).toFixed(2)}
                        </p>
                    </div>
                </div>
                <div>
                    <button className="justo-button">Make Payment</button>
                    <Link to={"/screenshare/"}><button className="justo-button">Request Screen Share</button></Link>
                </div>
            </div>
        )
}

export default ProfileTracker;