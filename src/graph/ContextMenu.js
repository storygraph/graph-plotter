import React from 'react';
import "./ContextMenu.css";

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);

        this.onContextMenu = this.onContextMenu.bind(this);
    }

    onContextMenu(e) {
        e.preventDefault();
    }

    render() {
        let options = [];

        for (let i = 0; i < this.props.options.length; i++) {
            options.push(<li key={i}>{this.props.options[i]}</li>);
        }

        return (
            <div 
            className="context-menu"
            id={this.props.id}
            onContextMenu={this.onContextMenu}
            style={{
                left: this.props.pos[0],
                top: this.props.pos[1],
                display: this.props.display,
                }}>
                <ul>{options}</ul>
            </div>
        );
    }
}

export default ContextMenu;