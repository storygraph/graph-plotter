import GLProg from './GLProg';

class Vertex {
    circleFidelity = 62;

    constructor(x, y, tex, strokeCol, gl, glProg, shaderProg, offset) {
        this.x = x;
        this.y = y;
        this.strokeCol = strokeCol;
        this.gl = gl;
        this.glProg = glProg;
        console.log(tex);
        this.tex = this.glProg.loadTexture(tex);
        this.shaderProg = shaderProg;
        this.offset = offset;
    }

    draw(index) {
        const INDEX = this.gl.getUniformLocation(this.shaderProg, "uIndex");
        this.gl.uniform1i(INDEX, index);

        const TEX_MODE = this.gl.getUniformLocation(this.shaderProg, "uTextureMode");

        this.drawCircle(this.strokeCol, false, 1.1);
        this.gl.uniform1i(TEX_MODE, true);
        this.drawCircle(this.tex, true, 1);
        this.gl.uniform1i(TEX_MODE, false);
    }

    drawCircle(colorInfo, useTex, scale) {

        let vertBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);

        let vertices = this.getVertices();

        for (let i = 0; i < vertices.length; i++) {
            vertices[i] *= scale;
        }

        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

        const aXY = this.gl.getAttribLocation(this.shaderProg, "aXY")
        this.gl.vertexAttribPointer(aXY, 2, this.gl.FLOAT, false, 4 * GLProg.FLOAT_SIZE, 0 * GLProg.FLOAT_SIZE);
        this.gl.enableVertexAttribArray(aXY);

        const aST = this.gl.getAttribLocation(this.shaderProg, "aST");
		this.gl.enableVertexAttribArray(aST);
		this.gl.vertexAttribPointer(aST, 2, this.gl.FLOAT, false, 4 * GLProg.FLOAT_SIZE, 2 * GLProg.FLOAT_SIZE);

        const OFF_COORD = this.gl.getUniformLocation(this.shaderProg, "uOffset");
        this.gl.uniform2fv(OFF_COORD, [this.x + this.offset[0], this.y + this.offset[1]]);

        if (useTex) {
            const uSampler = this.gl.getUniformLocation(this.shaderProg, "uSampler");
            this.gl.activeTexture(this.gl.TEXTURE0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, colorInfo)
            this.gl.uniform1i(uSampler, 0);
        } else {
            const COLOR_COORD = this.gl.getUniformLocation(this.shaderProg, "uColor");
            this.gl.uniform3fv(COLOR_COORD, colorInfo);
        }

        this.gl.drawArrays(this.gl.TRIANGLE_FAN, 0, vertices.length / 4);
    }

    getVertices() {
        let angle = 0;
        let dAngle = 2 * Math.PI / this.circleFidelity;
        let x, y;
        let vertices = [];
        vertices.push(0, 0, 0.5, 0.5);

        for (let i = 0; i <= this.circleFidelity; ++i) {
            x = Math.cos(angle) / 2;
            y = Math.sin(angle) / 2;
            vertices.push(x, y, x+0.5, 0.5-y);
            angle += dAngle;
        }

        return vertices;
    }
}

export default Vertex;