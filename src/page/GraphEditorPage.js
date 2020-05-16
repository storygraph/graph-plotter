import React from 'react';
import './GraphEditorPage.css';
import Graph from '../graph/Graph';
import Timeline from './Timeline';

// bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
            // .cockpit-fullscreen contains only one Component
            // every other component should be placed in .cockpit and given a position: {relative | fixed | absolute | sticky}
            <div class="cockpit">
                <div class="cockpit-fullscreen"> <Graph id="graph-canvas" vertices={this.vertices} edges={this.edges} /> </div>
                <Timeline/>                                                      
            </div>
        );
    }
}

export default GraphEditorPage;