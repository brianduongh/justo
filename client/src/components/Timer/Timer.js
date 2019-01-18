import React from "react";
import "./style.css";
import Wrapper from "../Wrapper";
import ProfileTracker from "../ProfileTracker"
import FreelancerCard from "../FreelancerCard"
import freelancers from "../../freelancers.json";
import { Grid, Row, Col } from "react-bootstrap";


class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            timerStarted: false,
            timerStopped: true,
            hours: 0,
            minutes: 0,
            seconds: 0,
            hourlyPay: 20,
            payAmount: 0,
            captures: [],

            freelancers,
            user_id: null
        };
        this.doMath = this.doMath.bind(this)
    }

    componentWillMount(){
        console.log(this.props.id);
        this.setState({ user_id: this.props.id })
    }

    handleTimerStart(e) {
        e.preventDefault();
        if (this.state.timerStopped) {
            this.timer= setInterval(()=> {
                this.setState({
                    timerStarted: true,
                    timerStopped: false
                })
                if(this.state.timerStarted) {
                    this.setState((prevState) => { return {seconds: prevState.seconds +1}});

                    if(this.state.seconds >= 60) {
                        this.setState((prevState) =>{ return { minutes: prevState.minutes + 1, seconds: 0}});
                    }
                    if (this.state.minutes >= 60) {
                        this.setState((prevState) =>{return { hours: prevState.hours + 1, minutes: 0, seconds: 0}});
                    }
                }
            }, 1000);
        }
    }

    handleTimerStop (e) {
        e.preventDefault();
        this.setState({timerStarted: false, timerStopped: true});
        clearInterval(this.timer);
    }

    handleTimerReset(e){
        e.preventDefault();
        this.setState({
            timerStarted: false,
            timerStopped: true,
            seconds: 0, 
            minutes: 0, 
            hours: 0 })
        clearInterval(this.timer)
    }

    doMath(hrs, mins, secs)  {
        let countAmount = (hrs+mins/60+secs/60/60)*this.state.hourlyPay
        this.setState({payAmount: countAmount })
        return this.state.payAmount
    }

    handleTimeCapture () {
        this.setState((prevState)=>({ captures: [...prevState.captures, this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds]}))
        this.doMath(this.state.hours, this.state.minutes, this.state.seconds)
    }

    render() {
        return (
            <div>
                <Wrapper>
                    <Grid>
                        <Row>

                            <Col xs={12} sm={12} md={6}>
                                <button id="upload-link" className="justo-button" >Upload Profile Photo</button>
                                <FreelancerCard
                                    name={freelancers[this.state.user_id].name}
                                    image={"../" + freelancers[this.state.user_id].image}
                                    active={freelancers[this.state.user_id].active}
                                    showPeople={this.showPeople}
                                />
                            </Col>

                            <Col xs={12} sm={12} md={6}>
                                <div className="timer-controls">
                                    <button className="btn btn-success" onClick={this.handleTimerStart.bind(this)}>Start Timer</button>
                                    <button className="btn btn-alert" onClick={this.handleTimerStop.bind(this)}>Stop Timer</button>
                                    <button className="btn btn-info" onClick={this.handleTimeCapture.bind(this)}>CalcPayment</button>
                                    <button className="btn btn-danger" onClick={this.handleTimerReset.bind(this)}>Reset</button>
                                </div>
                                <ProfileTracker
                                    key={freelancers[0].id}
                                    id={freelancers[this.state.user_id].id}
                                    name={freelancers[this.state.user_id].name}
                                    profession={freelancers[this.state.user_id].profession}
                                    hours={this.state.hours} minutes={this.state.minutes} seconds= {this.state.seconds} 
                                    rate={freelancers[this.state.user_id].rate} 
                                    payAmount={this.state.payAmount}>
                                </ProfileTracker>
                            </Col>

                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        )
    }
}

export default Timer;