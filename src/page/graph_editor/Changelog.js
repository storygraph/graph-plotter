import React from 'react';
import './Changelog.css';
import IconFactory from '../common/IconFactory';

const VERTEX = "vertex";
const EDGE = "edge";


class Changelog extends React.Component {
    changelogToDOM(idx, obj) {
        let icon, changelogAction;

        switch (obj.subject.type) {
            case VERTEX:
                icon = IconFactory.getWeenieThumbnail();
                changelogAction = obj.action + " " + obj.subject.name + " to the story";
                break;
            case EDGE:
                icon = IconFactory.getRelationThumbnail();
                changelogAction = obj.action + " " +
                    obj.subject.name +
                    " from " + obj.subject.edge[0] +
                    " to " + obj.subject.edge[1];
                break;
            default:
                icon = IconFactory.getWeenieThumbnail();
                changelogAction = "unknown";
        }

        return (
            <div key={idx} className="changelog-item">
                <figure className="changelog-thumb">{icon}</figure>
                <div className="changelog-desc-wrapp">
                    <h2 className="changelog-subject">{obj.subject.name}</h2>
                    <p className="changelog-action">{changelogAction}</p>
                    <p className="changelog-desc" >{obj.description}</p>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="changelog">
                <header className="changelog-header"><h1>Change Log</h1></header>
                {this.props.changelog.map((ch, idx) => this.changelogToDOM(idx, ch))}
            </div>
        );
    }
}

export default Changelog;