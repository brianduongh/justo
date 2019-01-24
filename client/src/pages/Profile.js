import React from "react";
import Navs from "../components/Nav"
import ProfileForms from "../components/ProfileForms"


function ShowProfile() {
	return (
    	<div>
        <Navs page ="Profile"/>
		{/* <Timer id={props.match.params.id} /> */}
		<ProfileForms id={5} />
    	</div>
  	);
}

export default ShowProfile;