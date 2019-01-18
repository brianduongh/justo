
import React from "react";
import { start, resume, pause, stop, reset, timerState } from "react-compound-timer";

export default class Timer extends React.Component {
    render() {
        <Timer
            initialTime={55000}
            startImmediately={false}
        >
            {({ start, resume, pause, stop, reset, timerState }) => (
                <React.Fragment>
                    <div>
                        <Timer.Days /> days
                <Timer.Hours /> hours
                <Timer.Minutes /> minutes
                <Timer.Seconds /> seconds
                <Timer.Milliseconds /> milliseconds
            </div>
                    <div>{timerState}</div>
                    <br />
                    <div>
                        <button onClick={start}>Start</button>
                        <button onClick={pause}>Pause</button>
                        <button onClick={resume}>Resume</button>
                        <button onClick={stop}>Stop</button>
                        <button onClick={reset}>Reset</button>
                    </div>
                </React.Fragment>
            )}
        </Timer>

    }

}
