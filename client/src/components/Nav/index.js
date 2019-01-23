import React from "react";
import "./style.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import axios from 'axios';

function Navs(props){

		return (
			<div>
				<Navbar>

					<Navbar.Header>
						<Navbar.Brand>
							<a href="/dashboard" id ="brand">
								{props.page}
							</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>

					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} href="/dashboard">
								Dashboard
							</NavItem>
							<NavItem eventKey={2} href="/profile">
								Profile
							</NavItem>
							<NavItem eventKey={3} onClick={props.logout} href="/">
								Sign Out
							</NavItem>
						</Nav>
					</Navbar.Collapse>

				</Navbar>
			</div>
		)
}

export default Navs;
