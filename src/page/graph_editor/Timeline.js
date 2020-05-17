import React from 'react';
import './Timeline.css';
import Changelog from './Changelog'
import TimelineMock from '../common/mock/TimelineMock';
import IconFactory from '../common/IconFactory';

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentEvent: -1,
            changelog: [],
        }

        // TODO: fetch from backend
        this.timeline = TimelineMock.TIMELINE;;
    }

    componentDidMount() {
        this.loadEvents(0);
    }

    getEvent(idx) {
        return this.timeline.events.find((el) => el.id === idx);
    }

    loadEvents(idx) {
        const event = this.getEvent(idx);

        this.setState({
            activeEvent: event.id,
            changelog: event.changelog,
        });
    }

    // we need to give a function pointer to setState,
    // so we contruct that function with (event) as a argument
    setChangelog = (event) => (state, props) => {
        this.setState({
            currentEvent: event.id,
            changelog: event.changelog
        });
    }

    render() {
        return (
            <div className="timeline">
                <div className="timeline-events">
                    {IconFactory.getClockThumbnail()}
                    {this.timeline.events.map(event => {
                        return <button
                            key={event.id}
                            className={'timeline-event ' + (this.state.currentEvent === event.id ? 'timeline-event-selected' : '')}
                            onClick={this.setChangelog(event)}
                        ></button>
                    })}
                </div>
                <div className="timeline-history">
                    <Changelog key={this.state.currentEvent} changelog={this.state.changelog} />
                </div>
            </div>
        );
    }
}

export default Timeline;