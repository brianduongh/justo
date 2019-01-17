import React from "react";
import "./style.css";

class Tracker extends React.Component {
 
    // addTimeToProject = (hours, minutes, seconds) => {
    //     this.setState({
    //     hours: this.state.hours + hours,
    //     minutes: this.state.minutes + minutes,
    //     seconds: this.state.seconds + seconds
    //     })
    // }
    
    render () {

        return (
            <div id="tracker">
            <h1>Project Tracker</h1>
            <p>project hours:{this.props.hours}hrs {this.props.minutes}min {this.props.seconds}sec</p>
            <p>rate/hr: {this.props.hourlyPay}</p>
            <p>pay amount($): {(this.props.payAmount).toFixed(2)} </p>
            </div> 

        )
    }

}

export default Tracker;