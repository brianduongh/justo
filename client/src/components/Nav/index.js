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

			<Navbar>

				<Navbar.Header>
                        <Navbar.Brand>
                            <a href="/dashboard" id ="brand">
                                {props.page}
                            </a>
                        </Navbar.Brand>
                        {/* <i class="fas fa-user-plus" id ="plus"></i> */}
                    <Navbar.Toggle />
				</Navbar.Header>

				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="/dashboard">
							Dashboard
						</NavItem>
						{/* <NavItem eventKey={2} href="/account">
							Account
						</NavItem> */}
						<NavItem eventKey={2} href="/signout">
							Sign Out
						</NavItem>
					</Nav>
				</Navbar.Collapse>

			</Navbar>
		)
	// }
// }
}

export default Navs;
