import React from "react";
import "./style.css";

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
                    <button className="justo-button"><a style={{ color:"#ECECEC" }} href="/screenshare">Request Screen Share</a></button>
                </div>
            </div>
        )
}

export default ProfileTracker;