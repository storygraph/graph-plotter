import React from 'react';
import './GraphEditorPage.css';
import Graph from '../../graph/Graph';
import Edge from '../../gl/Edge';
import Timeline from './Timeline';
import SideMenu from '../common/menu/SideMenu';

class GraphEditorPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vertices: [[0, 1], [2, 3], [-3, 2], [-1, 4]],
            edges: [[0, 1, Edge.RELATIONBOW.HATRED], [0, 2, Edge.RELATIONBOW.LOVE], [3, 2, Edge.RELATIONBOW.NEUTRALITY], [3, 0, Edge.RELATIONBOW.FRIENDSHIP]],
        };
    }

    render() {
        return (
            <div className="cockpit">
                <SideMenu menuType={SideMenu.STORY_TELLER_MENU} />
                <div className="cockpit-fullscreen">
                    <Graph id="graph-canvas" vertices={this.state.vertices} edges={this.state.edges} />
                </div>
                <Timeline />
            </div>
        );
    }
}

export default GraphEditorPage;