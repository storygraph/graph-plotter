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
	
	draw(index) {
		const INDEX = this.gl.getUniformLocation(this.shaderProg, "uIndex");
        this.gl.uniform1i(INDEX, Math.pow(2^12) + index);

		let vertBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);
		let ratio = this.canvas.width/this.canvas.height;
        let vertices = [this.a.x*ratio, this.a.y, this.b.x*ratio, this.b.y];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

		const aXY = this.gl.getAttribLocation(this.shaderProg, "aXY")
		this.gl.vertexAttribPointer(aXY, 2, this.gl.FLOAT, false, 2 * GLProg.FLOAT_SIZE, 0 * GLProg.FLOAT_SIZE);
        this.gl.enableVertexAttribArray(aXY);

		const OFF_COORD = this.gl.getUniformLocation(this.shaderProg, "uOffset");
		this.gl.uniform2fv(OFF_COORD, this.offset);

		const COLOR_COORD = this.gl.getUniformLocation(this.shaderProg, "uColor");
		this.gl.uniform3fv(COLOR_COORD, this.col);

		this.gl.drawArrays(this.gl.LINES, 0, 2);
    }
}

export default Edge;