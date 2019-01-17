import React from "react";
import Navs from "../components/Nav"
import Account from "../components/Account"


function ShowAccount() {
	return (
    	<div>
        <Navs page ="Account"/>
		<Account/>
    	</div>
  	);
}

export default ShowAccount;