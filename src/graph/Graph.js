import React from 'react';
import './Graph.css';
import GLProg from '../gl/GLProg';
import FlatShader from '../gl/shader/FlatShader';
import Vertex from '../gl/Vertex';
import Edge from '../gl/Edge';
import ContextMenu from './ContextMenu';
import Colors from './Colors';

class Graph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contextMenuOn: false,
            options: [],
        };

        this.contextMenuPos = [0,0];
        this.vertices = [];
        this.edges = [];
        this.zoom = 0.2;
        this.offset = [0, 0];
        this.isMouseDragging = false;
        this.currVertex = null;
        this.currEdge = null;
        this.mousePos = [0, 0];
        this.oldMousePos = this.mousePos;
        this.selectMode = false;

        this.stopDragging = this.stopDragging.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
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
        
        this.pushVertex(-4, 0, Colors.TEAL, Colors.DARK_1);
        this.pushVertex(-3, 3, Colors.TEAL, Colors.DARK_1);
        this.pushVertex(0, 4, Colors.TEAL, Colors.DARK_1);
        this.pushVertex(2, -2, Colors.TEAL, Colors.DARK_1);
        this.pushVertex(0, -3, Colors.TEAL, Colors.DARK_1);

        this.pushEdge(0, 1, Colors.MELON);
        this.pushEdge(2, 1, Colors.MELON);
        this.pushEdge(4, 0, Colors.MELON);
        this.pushEdge(3, 4, Colors.MELON);

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

    pushVertex(x, y, col, strokeCol) {
        this.vertices.push(new Vertex(
            x, y, col, strokeCol,
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
        let localZoom = 1/this.zoom;
        if (this.selectMode===true) {
            localZoom = 4 * localZoom;
        }
        for (let i = 0; i < this.edges.length; i++) {
            this.edges[i].draw(i, localZoom);
        }
    }
    
    drawFrame() {
        const ZOOM_COORD = this.gl.getUniformLocation(this.shaderProg, "uZoom");
        this.gl.uniform1f(ZOOM_COORD, this.zoom);
        
        const SELECT_MODE = this.gl.getUniformLocation(this.shaderProg, "uSelectMode");

        // selection
        this.selectMode = true;
        this.gl.clearColor(1, 1, 1, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.uniform1i(SELECT_MODE, this.selectMode);

        this.drawEdges();
        this.drawVertices();

        this.selectVertex();
        this.selectEdge();

        // drawing
        this.selectMode = false;
        this.gl.clearColor(Colors.DARK_1[0], Colors.DARK_1[1], Colors.DARK_1[2], 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.uniform1i(SELECT_MODE, this.selectMode);

        this.drawEdges();
        this.drawVertices();

        requestAnimationFrame(this.drawFrame);
    }

    getX(e) {
		return e.clientX - this.gl.canvas.offsetLeft - this.gl.canvas.offsetWidth/2;
    }
    
    getY(e) {
        return - e.clientY + this.gl.canvas.offsetTop + this.gl.canvas.offsetHeight/2;
    }

    selectVertex() {
        if (this.isMouseDragging === true || this.currEdge != null) {
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

    selectEdge() {
        if (this.isMouseDragging === true || this.currVertex != null) {
            return;
        }

        let pixelValues = this.getColorAtCursor();
        let index = pixelValues[0] * 256 * 256 + pixelValues[1] * 256 + pixelValues[2] - Math.pow(2, 12);

        if (index >= 0 && index < this.edges.length) {
            this.currEdge = index;
            return;
        }
        
        this.currEdge = null;
    }

    isBackgroundSelected(pixelValues) {
        for (let i = 0; i < pixelValues.length; i++) {
            if (pixelValues[i] !== 255) {
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

    stopDragging() {
        this.isMouseDragging = false;
        this.currVertex = null;
    }

    onMouseMove(e) {
        this.mousePos = [
            this.getX(e) + Math.round(this.gl.canvas.width/2),
            this.getY(e) + Math.round(this.gl.canvas.height/2),
        ];

        this.contextMenuPos = [
            this.getX(e) + Math.round(this.gl.canvas.width/2),
            -this.getY(e) + Math.round(this.gl.canvas.height/2),
        ];

        let centralPos = [this.getX(e), this.getY(e)];

        if (!this.isMouseDragging) {
            this.oldMousePos = this.mousePos;
            return;
        }

        if (this.currVertex != null) {
            this.vertices[this.currVertex].x = (2*centralPos[0]/this.canvas.width) / this.zoom - this.offset[0];
            this.vertices[this.currVertex].y = (2*centralPos[1]/this.canvas.height) / this.zoom - this.offset[1];
        } else {
            this.offset[0] += ((this.mousePos[0] - this.oldMousePos[0])/100) * Math.exp(this.zoom * 0.000001);
            this.offset[1] += ((this.mousePos[1] - this.oldMousePos[1])/100) * Math.exp(this.zoom * 0.000001);
        }

        this.oldMousePos = this.mousePos;
    }

    onMouseDown(e) {
        e.preventDefault();
        this.isMouseDragging = true;

        this.setState({contextMenuOn: false});

        if (e.button != 2) {
            return;
        }

        // a vertex is selected
        if (this.currVertex != null) {
            this.setState({
                contextMenuOn: true,
                options: [
                    "Change location", 
                    "Change status",
                    "Add relation",
                    "Add tag",
                    "Edit description",
                    "Remove",
                ],
            });
            return;
        // edge is selected
        } else if (this.currEdge != null) {
            this.setState({
                contextMenuOn: true,
                options: [
                    "Change relation", 
                    "Dublicate",
                    "Remove relation",
                ],
            });
        // background is selected
        } else {
            this.setState({
                contextMenuOn: true,
                options: ["Add weenie", "Add relation"],
            });
        }
    }

    onWheel(e) {
        this.zoom -= e.deltaY/250;

        if (this.zoom < 0.05) {
            this.zoom = 0.05;
        }

        if (this.zoom > 1) {
            this.zoom = 1;
        }
    }
    
    onContextMenu(e) {
        e.preventDefault();
    }

    render() {
        let body = document.body;
        let html = document.documentElement;

        let pageHeight = Math.max(body.scrollHeight, body.offsetHeight,  html.clientHeight, html.scrollHeight, html.offsetHeight);
        let pageWidth = Math.max(body.scrollWidth, body.offsetWidth,  html.clientWidth, html.scrollWidth, html.offsetWidth);

        return (
        <div className="graph-wrapper">
            <canvas 
                id={this.props.id} 
                className="graph-canvas" 
                width={pageWidth}
                height={pageHeight}
                onContextMenu={this.onContextMenu}
                onWheel={this.onWheel}
                onMouseOut={this.stopDragging}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.stopDragging}
                onMouseDown={this.onMouseDown}></canvas>
            <ContextMenu 
                pos={this.contextMenuPos} 
                display={this.state.contextMenuOn ? "block" : "none"}
                id={this.props.id + "-context-menu"}
                options={this.state.options}/>
        </div>
        );
    }
}

export default Graph;