import React, { Component } from "react";
import Wrapper from "./Wrapper";
import FreelancerCard from "./FreelancerCard";
import freelancers from "../freelancers.json";
import { Grid, Row } from "react-bootstrap";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Wrapper>
                    <Grid>
                        <Row>
                            {freelancers.map(freelancer => (
                            <FreelancerCard
                                key={freelancer.id}
                                name={freelancer.name}
                                image={freelancer.image}
                                active={freelancer.active}
                            />
                            ))}
                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        );
    }
}

export default Dashboard;
