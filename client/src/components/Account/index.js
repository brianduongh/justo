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
                            <Col className="f-card" xs={12} sm={12} md={4}>
                                <button id="upload-link">Upload Profile Photo</button>
                            </Col>
                        </Row>
                        <Row>
                            <FreelancerCard
                                    key={freelancers[0].id}
                                    name={freelancers[0].name}
                                    image={freelancers[0].image}
                                    active={freelancers[0].active}
                            />
                            <ProfileCard
                                    key={freelancers[0].id}
                                    id={freelancers[0].id}
                                    name={freelancers[0].name}
                                    profession={freelancers[0].profession}
                                    rate={freelancers[0].rate}
                            />
                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        );
    }
}

export default Account;
