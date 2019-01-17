import Navs from "../components/Nav"

import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import FreelancerCard from "../components/FreelancerCard";
import freelancers from "../freelancers.json";
import { Grid, Row } from "react-bootstrap";

class Dashboard extends Component {
    render() {
        return (
            <div>        
              <Navs page ="Dashboard" image ="<i class='fas fa-plus'></i>"/>
                <Wrapper>
                    <Grid>
                        <Row>
                            {freelancers.map(freelancer => (
                            <FreelancerCard style={{ float:"left"}}
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

