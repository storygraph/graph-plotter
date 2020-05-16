import React from 'react';
import './GraphEditorPage.css';
import Graph from '../graph/Graph';

class GraphEditorPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vertices: [],
            edges: [],
        };

        // array of XY coords
        this.vertices = [[0, 1], [2, 3], [-3, 2]];
        // array of FROM TO vertices
        this.edges = [[0, 1], [0, 2]];
    }

    render() {
        return (
            <div className="">
                <Graph id="graph-canvas" vertices={this.vertices} edges={this.edges} />
            </div>
        );
    }
}

export default GraphEditorPage;