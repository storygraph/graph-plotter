import React from 'react';
import './Graph.css';
import GLProg from '../gl/GLProg';
import FlatShader from '../gl/shader/FlatShader';
import Vertex from '../gl/Vertex';
import Edge from '../gl/Edge';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.vertices = [];
        this.edges = [];
        this.zoom = 0.2;
        this.offset = [0, 0];
        this.isMouseDragging = false;
        this.currVertex = null;
        this.mousePos = [0, 0];

        this.stopDragging = this.stopDragging.bind(this);
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
        
        this.pushVertex(-4, 0, [1, 1, 0]);
        this.pushVertex(-3, 3, [1, 0, 1]);
        this.pushVertex(0, 4, [0, 1, 1]);
        this.pushVertex(2, -2, [1, 0, 0]);
        this.pushVertex(0, -3, [0, 0, 1]);

        this.pushEdge(0, 1, [1, 1, 0]);
        this.pushEdge(2, 1, [1, 1, 0]);
        this.pushEdge(4, 0, [1, 1, 0]);
        this.pushEdge(4, 3, [1, 1, 0]);

        this.drawFrame();
    }

    pushEdge(a, b, col) {
        this.edges.push(new Edge(
                this.vertices[a], 
                this.vertices[b], 
                col, 
                this.gl, 
                this.canvas, 
                this.shaderProg, 
                this.offset
        ));
    }

    pushVertex(x, y, col) {
        this.vertices.push(new Vertex(
            x, y, col, 
            this.gl, 
            this.shaderProg, 
            this.offset
        ));
    }

    drawVertices() {
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertices[i].draw(i);
        }
    }
    
    drawEdges() {
        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i].draw(i);
        }
    }
    
    drawFrame() {
        const ZOOM_COORD = this.gl.getUniformLocation(this.shaderProg, "uZoom");
        this.gl.uniform1f(ZOOM_COORD, this.zoom);
        
        const SELECT_MODE = this.gl.getUniformLocation(this.shaderProg, "uSelectMode");

        // selection
        this.gl.clearColor(1,1,1,1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.uniform1i(SELECT_MODE, true);

        this.drawEdges();
        this.drawVertices();

        this.selectVertex();

        // drawing
        this.gl.clearColor(0.1,0.1,0.1,1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.uniform1i(SELECT_MODE, false);

        this.drawEdges();
        this.drawVertices();

        requestAnimationFrame(this.drawFrame);
    }

    stopDragging() {
        this.isMouseDragging = false;
        this.currVertex = null;
    }

    onMouseMove(e) {
        this.mousePos = [
            this.getX(e) + Math.round(this.gl.canvas.width/2),
            this.getY(e) + Math.round(this.gl.canvas.height/2),
        ];

        let centralPos = [this.getX(e), this.getY(e)];

        if (!this.isMouseDragging || this.currVertex == null) {
            return;
        }

        this.vertices[this.currVertex].x = (2*centralPos[0]/this.canvas.width) / this.zoom - this.offset[0];
        this.vertices[this.currVertex].y = (2*centralPos[1]/this.canvas.height) / this.zoom - this.offset[1];
    }

    onMouseDown() {
        this.isMouseDragging = true;
    }

    getX(e) {
		return e.clientX - this.gl.canvas.offsetLeft - this.gl.canvas.offsetWidth/2;
    }
    
    getY(e) {
        return - e.clientY + this.gl.canvas.offsetTop + this.gl.canvas.offsetHeight/2;
    }

    selectVertex() {
        if (this.isMouseDragging == true) {
            return;
        }

        let pixelValues = this.getColorAtCursor();

        let index = pixelValues[0] * 256 * 256 + pixelValues[1] * 256 + pixelValues[2];

        if (this.isBackgroundSelected(pixelValues) || index > this.vertices.length) {
            this.currVertex = null;
            return;
        }

        this.currVertex = index;
    }

    isBackgroundSelected(pixelValues) {
        for (let i = 0; i < pixelValues.length; i++) {
            if (pixelValues[i] != 255) {
                return false;
            }
        }

        return true;
    }

    getColorAtCursor() {
        let pixelValues = new Uint8Array(4);
        this.gl.readPixels(
            this.mousePos[0], 
            this.mousePos[1], 
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
            onMouseOut={this.stopDragging}
            onMouseMove={this.onMouseMove}
            onMouseUp={this.stopDragging}
            onMouseDown={this.onMouseDown}
            ></canvas>;
    }
}

export default Graph;