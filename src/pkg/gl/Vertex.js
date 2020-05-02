import GLProg from '../gl/GLProg';

class Vertex {
    circleFidelity = 20;

	constructor(x, y, col, gl, shaderProg, offset) {
		this.x = x;
		this.y = y;
        this.col = col;
        this.gl = gl;
        this.shaderProg = shaderProg;
        this.offset = offset;
    }
    
    draw(index) {
        const INDEX = this.gl.getUniformLocation(this.shaderProg, "uIndex");
        this.gl.uniform1i(INDEX, index);

        this.drawCircle([0,0,0], 1.1);
        this.drawCircle(this.col, 1);
    }

	drawCircle(col, scale) {
		let vertBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);
        
        let vertices = this.getVertices();

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= scale;
        }

		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

		const aXY = this.gl.getAttribLocation(this.shaderProg, "aXY")
		this.gl.vertexAttribPointer(aXY, 2, this.gl.FLOAT, false, 2 * GLProg.FLOAT_SIZE, 0 * GLProg.FLOAT_SIZE);
        this.gl.enableVertexAttribArray(aXY);

        const OFF_COORD = this.gl.getUniformLocation(this.shaderProg, "uOffset");
		this.gl.uniform2fv(OFF_COORD, [this.x + this.offset[0], this.y + this.offset[1]]);


		const COLOR_COORD = this.gl.getUniformLocation(this.shaderProg, "uColor");
		this.gl.uniform3fv(COLOR_COORD, col);

		this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, vertices.length/2);
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

        return vertices;
   }
}

export default Vertex;