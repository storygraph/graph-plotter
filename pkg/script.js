let canvas, gl;

const glsl = x => x;

zoom = 0.2;
offset = [-2, 0];

const VERT_CODE = glsl`
	attribute vec2 aXY;
	uniform float uRatio;
	uniform float uZoom;
    uniform vec2 uOffset;
    uniform vec3 uColor;

	void main(void) {
		gl_Position = vec4( (aXY.x/uRatio + uOffset.x) * uZoom, (aXY.y + uOffset.y) * uZoom, 0.0, 1.0);
	}
`;

const FRAG_CODE = glsl`
    precision highp float;
    uniform vec3 uColor;
    
	void main(void) {
		gl_FragColor = vec4(uColor, 1.0);
	}
`;

class Vertex {
	x = 0.0;
	y = 0.0;
    col = [0, 0, 0];
    circleFidelity = 20;

	constructor(x, y, col) {
		this.x = x;
		this.y = y;
		this.col = col;
    }
    
    draw() {
        this.drawCircle([0,0,0], 1.1);
        this.drawCircle(this.col, 1);
    }

	drawCircle(col, scale) {
		let vertBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
        
        
        let vertices = this.getVertices();

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= scale;
        }

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		const aXY = gl.getAttribLocation(shaderProg, "aXY")
		gl.vertexAttribPointer(aXY, 2, gl.FLOAT, false, 2*FLOAT_SIZE, 0*FLOAT_SIZE);
        gl.enableVertexAttribArray(aXY);

		const OFF_COORD = gl.getUniformLocation(shaderProg, "uOffset");
		gl.uniform2fv(OFF_COORD, [this.x + offset[0], this.y + offset[1]]);


		const COLOR_COORD = gl.getUniformLocation(shaderProg, "uColor");
		gl.uniform3fv(COLOR_COORD, col);

		gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length/2);
    }

	getVertices() {
        let angle = 0;
        let dAngle = 2*Math.PI/this.circleFidelity;
        let vertices = [];
		vertices.push(0, 0);
    
        for (let i = 0; i <= this.circleFidelity; ++i)
        {
            vertices.push(Math.cos(angle)/2, Math.sin(angle)/2);
            angle += dAngle;
        }

        console.log(vertices);

        return vertices;
   }
}

class Edge {
	constructor(a, b, col) {
		this.a = a;
		this.b = b;
		this.col = col;
	}
	
	draw() {
		let vertBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
		let ratio = canvas.width/canvas.height;
        let vertices = [this.a.x*ratio, this.a.y, this.b.x*ratio, this.b.y];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		const aXY = gl.getAttribLocation(shaderProg, "aXY")
		gl.vertexAttribPointer(aXY, 2, gl.FLOAT, false, 2*FLOAT_SIZE, 0*FLOAT_SIZE);
        gl.enableVertexAttribArray(aXY);

		const OFF_COORD = gl.getUniformLocation(shaderProg, "uOffset");
		gl.uniform2fv(OFF_COORD, offset);

		const COLOR_COORD = gl.getUniformLocation(shaderProg, "uColor");
		gl.uniform3fv(COLOR_COORD, this.col);

		gl.drawArrays(gl.LINES, 0, 2);
    }

}

vertices = [];
edges = [];


function drawVertices() {	
	vertices.forEach(
        vertex => vertex.draw()
    );
}

function drawEdges() {
	edges.forEach(
        edge => edge.draw()
    );
}

function pushEdges(a, b, col)
{
	edges.push(new Edge(vertices[a], vertices[b], col))
}

//function dragCanvas() {}
//function zoom() {}

function init() {
	canvas = document.getElementById('graph-canvas');
	gl = canvas.getContext('experimental-webgl');
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.clearColor(0.15, 0, 0.4, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    shaderProg = getProgram(VERT_CODE, FRAG_CODE);
    switchProgram(shaderProg);

	const RATIO_COORD = gl.getUniformLocation(shaderProg, "uRatio");
	gl.uniform1f(RATIO_COORD, canvas.width/canvas.height);

	gl.lineWidth(3);

	a = new Vertex(2, 0, [1, 1, 0]);
	b = new Vertex(-1, -1, [1, 0, 1]);

	vertices.push(new Vertex(2, 0, [1, 1, 0]));
	vertices.push(new Vertex(-1, -1, [1, 0, 1]));
	vertices.push(new Vertex(3, 4, [0, 1, 1]));
	vertices.push(new Vertex(5, -2, [1, 0, 0]));
	vertices.push(new Vertex(0, 3, [0, 0, 1]));

	pushEdges(0, 1, [1, 0, 0]);
	pushEdges(2, 1, [1, 0, 1]);
	pushEdges(4, 0, [0, 1, 0]);
	pushEdges(4, 3, [1, 1, 0]);
}

function update()
{
	//mouse controll
}

function draw()
{
	const ZOOM_COORD = gl.getUniformLocation(shaderProg, "uZoom");
	gl.uniform1f(ZOOM_COORD, zoom);
	
	drawEdges();
	drawVertices();
}

init()

update()
draw()
