import React from "react";
import Navs from "../components/Nav"
import Account from "../components/Account"

// const image = {
// 	width:'400px',
// 	height: 'auto'
// }


function ShowAccount(props) {
	return (
    	<div>
        <Navs page ="Account"/>
		<Account id={props.match.params.id}/>
    	</div>
  	);
}

export default ShowAccount;