import React from 'react';
import './Timeline.css';
import Changelog from './Changelog'

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.msg = "Hello timeline"
    }

    // returns array of events
    getEvents()
    {
        return [{"id": 0},{"id": 1},{"id": 2},{"id": 3},{"id": 4},{"id": 5},{"id": 6},{"id": 7},{"id": 8},{"id": 9}];
    }
    
    render() {
        const events = this.getEvents();
        return (
            <div class="timeline">
                <div class="timeline-events">
                    <svg class="timeline-clock bi bi-clock" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
                    </svg>
                    {events.map( (el) => {return <div class="timeline-event"></div> })}
                </div>
                <div class="timeline-history">
                    <Changelog />
                </div>
            </div>
        );
    }
}

export default Timeline;