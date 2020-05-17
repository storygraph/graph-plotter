import React from 'react';
import './GraphEditorPage.css';
import Graph from '../../graph/Graph';
import Timeline from './Timeline';

class GraphEditorPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vertices: [[0, 1], [2, 3], [-3, 2]],
            edges: [[0, 1], [0, 2]],
        };
    }

    render() {
        return (
            <div className="cockpit">
                <div className="cockpit-fullscreen">
                    <Graph id="graph-canvas" vertices={this.state.vertices} edges={this.state.edges} />
                </div>
                <Timeline />
            </div>
        );
    }
}

export default GraphEditorPage;