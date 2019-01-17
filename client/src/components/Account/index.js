import React, { Component } from "react";
import Wrapper from "../Wrapper";
import FreelancerCard from "../FreelancerCard";
import ProfileCard from "../ProfileCard";
import freelancers from "../../freelancers.json";
import { Grid, Row, Col } from "react-bootstrap";
import "./style.css";

class Account extends Component {

    render() {
        return (
            <div>
                <Wrapper>
                    <Grid>
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                {/* <button id="upload-link" className="justo-button" >Upload Profile Photo</button> */}
                                <FreelancerCard
                                        key={freelancers[0].id}
                                        name={freelancers[0].name}
                                        image={freelancers[0].image}
                                        active={freelancers[0].active}
                                />
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <ProfileCard
                                        key={freelancers[0].id}
                                        id={freelancers[0].id}
                                        name={freelancers[0].name}
                                        profession={freelancers[0].profession}
                                        rate={freelancers[0].rate}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        );
    }
}

export default Account;
