import React, { Component } from "react";
import "./style.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";

const page = "Justo";


class Navs extends Component {

	state ={
		background: "#544F4F"
	};

	changeColor = () => {
		this.setState({background:"white"});
	};

	render(){
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="/dashboard" id ="brand">{page}</a>

					</Navbar.Brand>
					<Navbar.Toggle />

				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="/dashboard" onClick ={this.changeColor} style={{background:this.state.background}}>
							Dashboard
						</NavItem>
						<NavItem eventKey={2} href="/account" onClick ={this.changeColor} style={{background:this.state.background}}>
							Account
						</NavItem>
						<NavItem eventKey={2} href="#" onClick ={this.changeColor} style={{background:this.state.background}}>
							Sign Out
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default Navs;

