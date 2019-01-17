import React, { Component } from "react";
import Wrapper from "../Wrapper";
import FreelancerCard from "../FreelancerCard";
import ProfileCard from "../ProfileCard";
import freelancers from "../../freelancers.json";
import { Grid, Row, Col } from "react-bootstrap";
import "./style.css";

class Account extends Component {
    state ={
        freelancers
    }
    
componentDidMount(){
    console.log(this.props.id);
}

    render() {
        return (
            <div>
                <Wrapper>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                {/* <button id="upload-link" className="justo-button" >Upload Profile Photo</button> */}
                                {this.state.freelancers.map(freelancer => (

                                    <FreelancerCard
                                            key={freelancer.id}
                                            name={freelancer.name}
                                            image={freelancer.image}
                                            active={freelancer.active}
                                            showPeople={this.showPeople}

                                    />

                                ))}

                                {this.state.freelancers.map(freelancer => (

                                    <ProfileCard
                                            key={freelancer.id}
                                            id={freelancer.id}
                                            name={freelancer.name}
                                            profession={freelancer.profession}
                                            rate={freelancer.rate}
                                    />

                                ))}
                            </Col>
                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        );
    }
}

export default Account;
