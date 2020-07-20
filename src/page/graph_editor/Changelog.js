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
                changelogAction = obj.action + " relation" +
                    " from " + obj.subject.edge[0] +
                    " to " + obj.subject.edge[1];
                break;
            default:
                icon = IconFactory.getWeenieThumbnail();
                changelogAction = "unknown";
        }

        return (
            <div key={idx} className="sidemenu-li">
                <figure className="sidemenu-thumb">{icon}</figure>
                <div className="sidemenu-li-content-wrapper">
                    <div className="sidemenu-li-subject">{obj.subject.name}</div>
                    <div className="sidemenu-li-p">{changelogAction}</div>
                    <div className="sidemenu-li-p italic">{obj.description}</div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="changelog">
                <div className="sidemenu-list-box">
                    <div className="heading">Action log</div>
                    <div className="heading no-text-transform">{this.props.eventName}</div>
                    {this.props.changelog.map((ch, idx) => this.changelogToDOM(idx, ch))}
                </div>
            </div>
        );
    }
}

export default Changelog;