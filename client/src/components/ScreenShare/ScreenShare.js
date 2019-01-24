/* global chrome */
import React from "react";
// import Video, { connect, LocalVideoTrack } from "twilio-video";

import "./style.css";
import NameControls from "./NameControls";
import RoomControls from "./RoomControls";

import $ from 'jquery';
window.jQuery = window.$ = $;


class ScreenShare extends React.Component {

    // var activeRoom;
    // var previewTracks;
    // var identity;
    // var roomName;
    // var screenTrack;

    constructor() {
        super();
        this.state = {
            activeRoom: null,
            // identity: null,
            roomName: null,
            screenTrack: null,
            data: null
        }
    }

    isFirefox =() => {
        var mediaSourceSupport = !!navigator.mediaDevices.getSupportedConstraints()
            .mediaSource;
        var matchData = navigator.userAgent.match(/Firefox\/(\d+)/);
        var firefoxVersion = 0;
        if (matchData && matchData[1]) {
            firefoxVersion = parseInt(matchData[1], 10);
        }
        return mediaSourceSupport && firefoxVersion >= 52;
    }

    isChrome = () => {
        return 'chrome' in window;
    }

    canScreenShare = () => {
        return this.isChrome || this.isFirefox;
    }

    getUserScreen = () => {
        var extensionId = "npnadcmokaeemdgomfmmpegajmdecidp";
        if (!this.canScreenShare()) {
            return;
        }
        if (this.isChrome()) {
            return new Promise((resolve, reject) => {
                const request = {
                    sources: ['screen']
                };
                chrome.runtime.sendMessage(extensionId, request, response => {
                    if (response && response.type === 'success') {
                        resolve({ streamId: response.streamId });
                    } else {
                        reject(new Error('Could not get stream'));
                    }
                });
            }).then(response => {
                return navigator.mediaDevices.getUserMedia({
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: response.streamId
                        }
                    }
                });
            });
        } else if (this.isFirefox()) {
            return navigator.mediaDevices.getUserMedia({
                video: {
                    mediaSource: 'screen'
                }
            });
        }
    }

    // Attach the Tracks to the DOM.
    attachTracks = (tracks, container) => {
        tracks.forEach (track => {
            container.appendChild(track.attach());
        });
    }

    // Attach the Participant's Tracks to the DOM.
    attachParticipantTracks= (participant, container) => {
        var tracks = Array.from(participant.tracks.values());
        this.attachTracks(tracks, container);
    }

    // Detach the Tracks from the DOM.
    detachTracks = tracks => {
        tracks.forEach( track => {
            track.detach().forEach( detachedElement => {
                detachedElement.remove();
            });
        });
    }

    // Detach the Participant's Tracks from the DOM.
    detachParticipantTracks = (participant) => {
        var tracks = Array.from(participant.tracks.values());
        this.detachTracks(tracks);
    }

    // When we are about to transition away from this page, disconnect
    // from the room, if joined.
    transAwayFromPage =() => {
        window.addEventListener('beforeunload', this.leaveRoomIfJoined);

    }

    // Obtain a token from the server in order to connect to the Room.
    getToken = id => {
        $.getJSON('/token?identity=' + encodeURIComponent(id),  data => {
            console.log("getData: " + JSON.stringify(data))
            this.setState({ data: data });
            this.log("Ready and connected as '" + this.state.data.identity + "'...");
            document.getElementById('room-controls').style.display = 'block';
        });
    }

    // Successfully connected!
    roomJoined = room => {
        // window.room = activeRoom = room;
        this.setState({ activeRoom: room })

        this.log("Joined as '" + this.state.data.identity + "'");
        document.getElementById('button-join').style.display = 'none';
        document.getElementById('button-leave').style.display = 'inline';
        if (this.canScreenShare()) {
            document.getElementById('button-share-screen').style.display = 'inline';
        }

        // Attach the Tracks of the Room's Participants.
        room.participants.forEach (participant => {
            this.log("Already in Room: '" + participant.identity + "'");
            var previewContainer = document.getElementById('remote-media');
            this.attachParticipantTracks(participant, previewContainer);
        });

        // When a Participant joins the Room, log the event.
        room.on('participantConnected',  participant => {
            this.log("Joining: '" + participant.identity + "'");
        });

        // When a Participant adds a Track, attach it to the DOM.
        room.on('trackAdded',  (track, participant) => {
            this.log(participant.identity + ' added track: ' + track.kind);
            var previewContainer = document.getElementById('remote-media');
            this.attachTracks([track], previewContainer);
        });

        // When a Participant removes a Track, detach it from the DOM.
        room.on('trackRemoved',  (track, participant) => {
            this.log(participant.identity + ' removed track: ' + track.kind);
            this.detachTracks([track]);
        });

        // When a Participant leaves the Room, detach its Tracks.
        room.on('participantDisconnected',  (participant) => {
            this.log("Participant '" + participant.identity + "' left the room");
            this.detachParticipantTracks(participant);
        });

        // Once the LocalParticipant leaves the room, detach the Tracks
        // of all Participants, including that of the LocalParticipant.
        room.on('disconnected',  () => {
            this.log('Left');
            this.detachParticipantTracks(room.localParticipant);
            room.participants.forEach(this.detachParticipantTracks);
            this.setState({activeRoom : null});
            document.getElementById('button-join').style.display = 'inline';
            document.getElementById('button-leave').style.display = 'none';
        });

    }

    // Activity log.
    log = message => {
        var logDiv = document.getElementById('log');
        logDiv.innerHTML += '<p>&gt;&nbsp;' + message + '</p>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    // Leave Room.
    leaveRoomIfJoined = () => {
        if (this.state.activeRoom) {
            this.state.activeRoom.disconnect();
        }
    }

    setScreenTrack = screenTrack => {
        this.setState({screenTrack})
    }

render() {
    return (
        <div>
            <div id="remote-media"></div>
            <div id="controls">
                <div className="sidebyside">
                <NameControls token={this.getToken} />
                <RoomControls data={this.state.data} activeRoom={this.state.activeRoom} screenTrack={this.state.screenTrack} setScreenTrack={this.setScreenTrack} getUserScreen={this.getUserScreen} roomJoined={this.roomJoined} />
                </div>
                <div id="log" className="sidebyside" ></div>
            </div>
        </div>
    )
}

}

export default ScreenShare;