import React from 'react';
import './Graph.css';
import GLProg from '../gl/GLProg';
import FlatShader from '../gl/shader/FlatShader';
import Vertex from '../gl/Vertex';
import Edge from '../gl/Edge';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vertices: [],
            edges: [],
            zoom: 0.2,
            offset: [-2, 0],
        };
    }

    componentDidMount() {
        this.canvas = document.getElementById(this.props.id);
        this.gl = this.canvas.getContext('experimental-webgl');
		this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
		this.gl.clearColor(0.15, 0, 0.4, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.GLProg = new GLProg(FlatShader.VERT_CODE, FlatShader.FRAG_CODE, this.gl);
        this.shaderProg = this.GLProg.getProgram();
        this.GLProg.switchProgram(this.shaderProg);

        const RATIO_COORD = this.gl.getUniformLocation(this.shaderProg, "uRatio");
        this.gl.uniform1f(RATIO_COORD, this.canvas.width/this.canvas.height);
        this.gl.lineWidth(3);
        
        this.pushVertex(2, 0, [1, 1, 0]);
        this.pushVertex(-1, -1, [1, 0, 1]);
        this.pushVertex(3, 4, [0, 1, 1]);
        this.pushVertex(5, -2, [1, 0, 0]);
        this.pushVertex(0, 3, [0, 0, 1]);

        this.pushEdge(0, 1, [1, 0, 0]);
        this.pushEdge(2, 1, [1, 0, 1]);
        this.pushEdge(4, 0, [0, 1, 0]);
        this.pushEdge(4, 3, [1, 1, 0]);

        this.draw();
    }

    // refactor
    pushEdge(a, b, col) {
        this.state.edges.push(new Edge(
                this.state.vertices[a], 
                this.state.vertices[b], 
                col, 
                this.gl, 
                this.canvas, 
                this.shaderProg, 
                this.state.offset
        ));
    }

    pushVertex(x, y, col) {
        this.state.vertices.push(new Vertex(
            x, y, col, 
            this.gl, 
            this.shaderProg, 
            this.state.offset
        ));
    }

    drawVertices() {	
        this.state.vertices.forEach(
            vertex => vertex.draw()
        );
    }
    
    drawEdges() {
        this.state.edges.forEach(
            edge => edge.draw()
        );
    }
    
    draw()
    {
        const ZOOM_COORD = this.gl.getUniformLocation(this.shaderProg, "uZoom");
        this.gl.uniform1f(ZOOM_COORD, this.state.zoom);
        
        this.drawEdges();
        this.drawVertices();
    }

    componentWillUnmount() {}

    render() {
        return <canvas id={this.props.id} className="graph-canvas" width="800" height="450"></canvas>;
    }
}

export default Graph;