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

        this.vertices = [];
        this.edges = [];

        this.contextMenuPos = [0, 0];
        this.zoom = 0.2;
        this.offset = [0, 0];
        this.isMouseDragging = false;
        this.currVertex = null;
        this.currEdge = null;
        this.relationCanditate = null;
        this.mousePos = [0, 0];
        this.oldMousePos = this.mousePos;
        this.selectMode = false;

        // bind event handlers
        this.stopDragging = this.stopDragging.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.drawFrame = this.drawFrame.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.centralPos = [0, 0];
    }

    componentDidMount() {
        this.canvas = document.getElementById(this.props.id);
        this.gl = this.canvas.getContext('webgl2', { preserveDrawingBuffer: true });
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.15, 0, 0.4, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.glProg = new GLProg(FlatShader.VERT_CODE, FlatShader.FRAG_CODE, this.gl, this.canvas.width, this.canvas.height);
        this.shaderProg = this.glProg.getProgram();
        this.glProg.switchProgram(this.shaderProg);

        const RATIO_COORD = this.gl.getUniformLocation(this.shaderProg, "uRatio");
        this.gl.uniform1f(RATIO_COORD, this.canvas.width / this.canvas.height);
        this.gl.lineWidth(5);

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.initVertices();
        this.initEdges();

        this.drawFrame();
    }

    initVertices() {
        for (let i = 0; i < this.props.vertices.length; i++) {
            let v = this.props.vertices[i];
            this.pushVertex(v[0], v[1], v[2], Colors.DARK_1);
        }
    }

    initEdges() {
        for (let i = 0; i < this.props.edges.length; i++) {
            let e = this.props.edges[i];
            this.pushEdge(e[0], e[1], e[2]);
        }
    }

    pushEdge(a, b, type) {
        this.edges.push(new Edge(
            this.vertices[a],
            this.vertices[b],
            type,
            this.gl,
            this.glProg,
            this.canvas,
            this.shaderProg,
            this.offset
        ));
    }

    pushVertex(x, y, tex, strokeCol) {
        this.vertices.push(new Vertex(
            x, y, tex, strokeCol,
            this.gl,
            this.glProg,
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
        let localZoom = 1 / this.zoom;
        if (this.selectMode === true) {
            localZoom = 1.5 * localZoom;
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
        return e.clientX - this.gl.canvas.offsetLeft - this.gl.canvas.offsetWidth / 2;
    }

    getY(e) {
        return - e.clientY + this.gl.canvas.offsetTop + this.gl.canvas.offsetHeight / 2;
    }

    selectVertex() {
        if (this.isMouseDragging === true || this.currEdge !== null) {
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
        if (this.isMouseDragging === true || this.currVertex !== null) {
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
            this.getX(e) + Math.round(this.gl.canvas.width / 2),
            this.getY(e) + Math.round(this.gl.canvas.height / 2),
        ];

        this.contextMenuPos = [
            this.getX(e) + Math.round(this.gl.canvas.width / 2),
            -this.getY(e) + Math.round(this.gl.canvas.height / 2),
        ];

        this.centralPos = [this.getX(e), this.getY(e)];

        if (!this.isMouseDragging) {
            this.oldMousePos = this.mousePos;
            return;
        }

        if (this.currVertex !== null) {
            this.vertices[this.currVertex].x = (2 * this.centralPos[0] / this.canvas.width) / this.zoom - this.offset[0];
            this.vertices[this.currVertex].y = (2 * this.centralPos[1] / this.canvas.height) / this.zoom - this.offset[1];
        } else {
            this.offset[0] += ((this.mousePos[0] - this.oldMousePos[0]) / 100) * Math.exp(this.zoom * 0.000001);
            this.offset[1] += ((this.mousePos[1] - this.oldMousePos[1]) / 100) * Math.exp(this.zoom * 0.000001);
        }

        this.oldMousePos = this.mousePos;
    }

    onMouseDown(e) {
        e.preventDefault();
        this.isMouseDragging = true;
        
        this.setState({ contextMenuOn: false });

        if (this.currVertex !== null && this.relationCanditate !== null && this.currVertex !== this.relationCanditate) {
            for (let i = 0; i < this.edges.length; i++) {
                if (this.edges[i].a === this.vertices[this.currVertex] && this.edges[i].b === this.vertices[this.relationCanditate]) {
                    return;
                }

                if (this.edges[i].b === this.vertices[this.currVertex] && this.edges[i].a === this.vertices[this.relationCanditate]) {
                    return;
                }
            }

            this.pushEdge(this.currVertex, this.relationCanditate, Edge.RELATIONBOW.NEUTRALITY);
            this.relationCanditate = null;
            return;
        }

        if (e.button !== 2) {
            return;
        }

        let graph = this;

        // a vertex is selected
        if (this.currVertex !== null) {
            this.setState({
                contextMenuOn: true,
                options: [
                    {
                        text: "Add relationship",
                        func: function() {
                            graph.relationCanditate = graph.currVertex;
                        },
                    },
                    {
                        text: "Delete weenie",
                        func: function() {
                            for (let i = 0; i < graph.edges.length; i++) {
                                if (graph.edges[i].a === graph.vertices[graph.currVertex] || graph.edges[i].b === graph.vertices[graph.currVertex]) {
                                    console.log(graph.edges.length);
                                    graph.edges.splice(i, 1);
                                    i--;
                                }
                            }
                            graph.vertices.splice(graph.currVertex, 1);
                        },
                    },
                ],
            });
            return;
            // edge is selected
        } else if (this.currEdge !== null) {
            console.log(this.currEdge);
            this.setState({
                contextMenuOn: true,
                options: [
                    {
                        text: "Change relationship to neutrality",
                        func: function() {
                            graph.edges[graph.currEdge].type = Edge.RELATIONBOW.NEUTRALITY;
                        }
                    },
                    {
                        text: "Change relationship to love",
                        func: function() {
                            graph.edges[graph.currEdge].type = Edge.RELATIONBOW.LOVE;
                        }
                    },
                    {
                        text: "Change relationship to hatred",
                        func: function() {
                            graph.edges[graph.currEdge].type = Edge.RELATIONBOW.HATRED;
                        }
                    },
                    {
                        text: "Change relationship to friendship",
                        func: function() {
                            graph.edges[graph.currEdge].type = Edge.RELATIONBOW.FRIENDSHIP;
                        }
                    },
                    {
                        text: "Delete relationship",
                        func: function() {
                            graph.edges.splice(graph.currEdge, 1);
                        }
                    }
                ],
            });
            // background is selected
        } else {
            let tex = require('../img/weenie/default_2.png');
            this.setState({
                contextMenuOn: true,
                options: [
                    {
                        text: "Add weenie",
                        func: function () {
                            let xPos = (2 * graph.centralPos[0] / graph.canvas.width) / graph.zoom - graph.offset[0];
                            let yPos = (2 * graph.centralPos[1] / graph.canvas.height) / graph.zoom - graph.offset[1];
                            console.log(xPos, yPos);

                            graph.pushVertex(xPos, yPos, tex, Colors.DARK_1);
                        },
                    },
                ],
            });
        }
    }

    onWheel(e) {
        this.zoom -= e.deltaY / 500;
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

        let pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        let pageWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

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
                    options={this.state.options} />
            </div>
        );
    }
}

export default Graph;
