import React from "react";
import Navs from "../components/Nav"
import Account from "../components/Account"


function ShowAccount(props) {
	return (
    	<div>
        <Navs page ="Account"/>
		<Account id={props.match.params.id} />

        	Account page
    	</div>
  	);
}

export default ShowAccount;