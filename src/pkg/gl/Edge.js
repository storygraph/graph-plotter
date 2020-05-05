import GLProg from '../gl/GLProg';

class Edge {
	constructor(a, b, col, gl, canvas, shaderProg, offset) {
		this.a = a;
		this.b = b;
		this.col = col;
		this.gl = gl;
		this.canvas = canvas;
		this.shaderProg = shaderProg;
		this.offset = offset;
	}
	
	calculateVertices(zoom) {
		let ratio = this.canvas.width/this.canvas.height;
		let ax = this.a.x*ratio;
		let bx = this.b.x*ratio;
		let ay = this.a.y;
		let by = this.b.y;
		let scale = 0.007*zoom;

		let len = Math.sqrt((ax-bx)*(ax-bx) + (ay-by)*(ay-by));
		let norm = [(ax-bx)/len*scale, (ay-by)/len*scale];


		let vertices = [
			ax-norm[1], ay+norm[0],
			ax+norm[1], ay-norm[0],
			bx-norm[1], by+norm[0],
			bx+norm[1], by-norm[0]
		]

		return vertices;
	}

	draw(index, zoom) {
		const INDEX = this.gl.getUniformLocation(this.shaderProg, "uIndex");
        this.gl.uniform1i(INDEX, 4096 + index);

		let vertBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);

		let vertices = this.calculateVertices(zoom);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

		const aXY = this.gl.getAttribLocation(this.shaderProg, "aXY")
		this.gl.vertexAttribPointer(aXY, 2, this.gl.FLOAT, false, 2 * GLProg.FLOAT_SIZE, 0 * GLProg.FLOAT_SIZE);
        this.gl.enableVertexAttribArray(aXY);

		const OFF_COORD = this.gl.getUniformLocation(this.shaderProg, "uOffset");
		this.gl.uniform2fv(OFF_COORD, this.offset);

		const COLOR_COORD = this.gl.getUniformLocation(this.shaderProg, "uColor");
		this.gl.uniform3fv(COLOR_COORD, this.col);

		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

export default Edge;