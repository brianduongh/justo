import React from "react";
import "./style.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navs(props){

		return (
			<div>
				<Navbar>

					<Navbar.Header>
						<Navbar.Brand>
							<a href="/" id ="brand">
								{props.page}
							</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>

					<Navbar.Collapse>
						<Nav pullRight>
							<NavItem eventKey={1} style={props.style}>
								<Link to={"/dashboard"}><button className="justo-button" type="submit">Dashboard</button></Link>
							</NavItem>
							<NavItem eventKey={2} style={props.style}>
								<Link to={"/profile"}><button className="justo-button" type="submit">Profile</button></Link>
							</NavItem>
							<NavItem eventKey={3} style={props.style}>
							<Link to={"/landing"}><button className="justo-button" type="submit">Sign Out</button></Link>
							</NavItem>
						</Nav>
					</Navbar.Collapse>

				</Navbar>
			</div>
		)
	// }
// }
}

export default Navs;
