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
            cursorPos: [0, 0],
        };

        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
    }

    componentDidMount() {
        this.canvas = document.getElementById(this.props.id);
        this.gl = this.canvas.getContext('webgl2', {preserveDrawingBuffer: true});
		this.gl.viewport(0,0,this.canvas.width,this.canvas.height);
		this.gl.clearColor(0.15, 0, 0.4, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.GLProg = new GLProg(FlatShader.VERT_CODE, FlatShader.FRAG_CODE, this.gl);
        this.shaderProg = this.GLProg.getProgram();
        this.GLProg.switchProgram(this.shaderProg);

        const RATIO_COORD = this.gl.getUniformLocation(this.shaderProg, "uRatio");
        this.gl.uniform1f(RATIO_COORD, this.canvas.width/this.canvas.height);
        this.gl.lineWidth(5);
        
        this.pushVertex(2, 0, [1, 1, 0]);
        this.pushVertex(-1, -1, [1, 0, 1]);
        this.pushVertex(3, 4, [0, 1, 1]);
        this.pushVertex(5, -2, [1, 0, 0]);
        this.pushVertex(0, 3, [0, 0, 1]);

        this.pushEdge(0, 1, [1, 0, 0]);
        this.pushEdge(2, 1, [1, 0, 1]);
        this.pushEdge(4, 0, [0, 1, 0]);
        this.pushEdge(4, 3, [1, 1, 0]);

        console.log(this.gl.getParameter(this.gl.VERSION));
console.log(this.gl.getParameter(this.gl.SHADING_LANGUAGE_VERSION));
console.log(this.gl.getParameter(this.gl.VENDOR));

        this.drawFrame();
    }

    // TODO: refactor
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
        for (let i = 0; i < this.state.vertices.length; i++) {
            this.state.vertices[i].draw(i);
        }
    }
    
    drawEdges() {
        for (let i = 0; i < this.state.edges.length; i++) {
            this.state.edges[i].draw(i);
        }
    }
    
    drawFrame()
    {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        const ZOOM_COORD = this.gl.getUniformLocation(this.shaderProg, "uZoom");
        this.gl.uniform1f(ZOOM_COORD, this.state.zoom);
        
        const SELECT_MODE = this.gl.getUniformLocation(this.shaderProg, "uSelectMode");

        this.gl.clearColor(1,1,1,1);
        this.gl.uniform1i(SELECT_MODE, true);

        this.drawEdges();
        this.drawVertices();
        

        // pick color

        this.gl.clearColor(0.1,0.1,0.1,1);
        this.gl.uniform1i(SELECT_MODE, false);

        this.drawEdges();
        this.drawVertices();

        requestAnimationFrame(this.drawFrame);
    }

    componentWillUnmount() {}

    onMouseOut() {
        console.log("Mouse got out!");
    }

    onMouseMove(e) {
        this.setState({
            cursorPos: [
                this.getX(e) + Math.round(this.gl.canvas.width/2),
                this.getY(e) + Math.round(this.gl.canvas.height/2),
            ]
        });
    }

    onMouseDown() {
        console.log(this.getColorAtCursor());
    }

    getX(e) {
		return e.clientX - this.gl.canvas.offsetLeft - this.gl.canvas.offsetWidth/2;
    }
    
    getY(e) {
        return - e.clientY + this.gl.canvas.offsetTop + this.gl.canvas.offsetHeight/2;
    }

    getColorAtCursor() {
        let pixelValues = new Uint8Array(4);
        console.log(this.state.cursorPos);
        this.gl.readPixels(
            this.state.cursorPos[0], 
            this.state.cursorPos[1], 
            1, 1, 
            this.gl.RGBA, 
            this.gl.UNSIGNED_BYTE, 
            pixelValues
        );

        return pixelValues;
    }
    
    render() {
        return <canvas 
                    id={this.props.id} 
                    className="graph-canvas" 
                    width="800" 
                    height="450"
                    onMouseOut={this.onMouseOut}
                    onMouseMove={this.onMouseMove}
                    onMouseDown={this.onMouseDown}
                    ></canvas>;
    }
}

export default Graph;