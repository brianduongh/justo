import React from "react";
import Video from "twilio-video";

class RoomControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: ""
        };

    }

    handleChange = e => {
        this.setState({ roomName: e.target.value });
    }

    // Bind button to join Room.
    handleJoin = () => { 
        if (!this.state.roomName) {
            alert('Please enter a room name.');
            return;
        }

        this.log("Joining room '" + this.state.roomName + "'...");
        var connectOptions = {
            name: this.state.roomName,
            tracks: []
        };

        // Join the Room with the token from the server and the
        // LocalParticipant's Tracks.
        Video.connect(this.props.data.token, connectOptions).then(this.props.roomJoined,  (error) => {
            this.log('Could not connect to Twilio: ' + error.message);
        });
    };

    // Bind button to leave Room.
    handleLeave = () => {
        this.log('Leaving room...');
        this.props.activeRoom.disconnect();
      };

    
    handleShareScreen = () => {
        this.props.getUserScreen().then(stream => {
          this.props.setScreenTrack(stream.getVideoTracks()[0]);
          this.props.activeRoom.localParticipant.publishTrack(stream.getVideoTracks()[0]);
          document.getElementById('button-share-screen').style.display = 'none';
          document.getElementById('button-unshare-screen').style.display =
            'inline';
        });
      };
    
    handleUnshareScreen = () => {
        this.props.activeRoom.localParticipant.unpublishTrack(this.props.screenTrack);
        this.props.setScreenTrack(null);
        document.getElementById('button-share-screen').style.display = 'inline';
        document.getElementById('button-unshare-screen').style.display = 'none';
      };

    // Activity log.
    log(message) {
        var logDiv = document.getElementById('log');
        logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }

render() {
    return (
        <div>
            <div id="room-controls">
                <p className="instructions">Room Name:</p>
                <input id="room-name" type="text" onChange={this.handleChange} />
                <button id="button-join" onClick={this.handleJoin}>Join Room</button>
                <button id="button-leave" onClick={this.handleLeave}>Leave Room</button>
                <button id="button-share-screen" onClick={this.handleShareScreen}>Share screen</button>
                <button id="button-unshare-screen" onClick={this.handleUnshareScreen}>Unshare screen</button>
            
            </div>

        </div>



    )
}

}

export default RoomControls;