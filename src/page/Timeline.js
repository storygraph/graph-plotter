import React from 'react';
import './Timeline.css';
import Changelog from './Changelog'

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = 
        {
            currentEvent: -1,
            changelog: [],
        }

        // this should be fetched from the Go service
        this.timeline = {}
        
    }

    loadTimeline(idx)
    {
        if (Object.keys(this.timeline).length === 0)
        {
            this.timeline = {
                "timeline": "dadsadas",
                "events": 
                [
                    {
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 0,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 2",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 1,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 2",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 2,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 2",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 3,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 2",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 4,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 00100",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 5,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding ",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description ",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 6,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding round Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 314",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 7,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding evil Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 3c3 ",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 8,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding more Ivan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 11",
                            }
                        ]
                    },{
                        "vertices": [[]],
                        "edges": [[]],
                        "id": 9,
                        "changelog": 
                        [
                            {
                                "subject": {
                                    "type": "vertex",
                                    "idx": 1, // idx
                                    "name": "Ivan"
                                },
                                "action": "add",
                                "description": "Adding anotherIvan",
                            },
                            {
                                "subject": {
                                    "type": "edge",
                                    "edge": [0, 1], // from, to
                                    "name": "Friendship"
                                },
                                "action": "add",
                                "description": "description 12",
                            }
                        ]
                    },
                ]
            };
        }
        return this.timeline.events.find( (el) => el.id === idx);
    }

    // returns array of events
    getEvents(idx)
    {
        // if idx is not in loaded timeline, request another chunk
        const event = this.timeline.events.find( (el) => el.id === idx);
        if (event === undefined)
        {
            this.loadTimeline(idx);
        }
        this.setState(
            state => ({
                activeEvent: event.id,
                changelog: event.changelog
            })
        )
    }

    // we need to give a function pointer to setState,
    // so we contruct that function with (event) as a argument
    setChangelog = (event) => (state, props) => {
        this.setState({
            currentEvent: event.id,
            changelog: event.changelog
        },);
    }
    
    render() {
        this.loadTimeline(0);
        return (
            <div className="timeline">
                <div className="timeline-events">
                    <svg className="timeline-clock bi bi-clock" width="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clipRule="evenodd"/>
                        <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clipRule="evenodd"/>
                    </svg>
                    {this.timeline.events.map( event => {
                            return <button 
                                key={event.id}
                                className={'timeline-event ' + (this.state.currentEvent === event.id ? 'timeline-event-selected' : '') }
                                onClick={ this.setChangelog(event) }
                            ></button>
                        })}
                </div>
                <div className="timeline-history">
                    <Changelog key={this.state.currentEvent} changelog={this.state.changelog}/>
                </div>
            </div>
        );
    }
}

export default Timeline;