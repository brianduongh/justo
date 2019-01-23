import React from "react";


class NameControls extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            userName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
   
    }

    handleChange(e) {
        this.setState({userName: e.target.value});
        // console.log(e.target.userName)
      }

    handleClick(e){
        e.preventDefault();
        
        //var id = document.getElementById('identity').value;
        if (!this.state.userName) {
            alert('Please enter your name.');
            return;
        }
        document.getElementById('identity-controls').style.display = 'none';
        document.getElementById('room-controls').style.display = 'inline';
        console.log(this.state.userName);
        this.props.token(this.state.userName);
          
    }

    render() {

        return (
            <div>
                <div id="identity-controls">
                    <p className="instructions">Name:</p>
                    <input id="identity" type="text" onChange={this.handleChange}  />
                    <button id="identity-connect" onClick={this.handleClick}>Connect</button>
                </div>
            </div>

        )
    }
}

export default NameControls;