import React from "react";
import "./style.css";
import { Navbar, NavItem, Nav } from "react-bootstrap";
// const title ={
// 	left: '50%'
// }

// class Navs extends Component {
function Navs(props){

	// state ={
	// 	background: "#544F4F"
	// };

	// changeColor = () => {
	// 	this.setState({background:"white"});
	// };

	// render(props){

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
							<NavItem eventKey={1} href="/dashboard">
								Dashboard
							</NavItem>
							<NavItem eventKey={2} href="/profile">
								Profile
							</NavItem>
							<NavItem eventKey={3} href="/signout">
								Sign Out
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
