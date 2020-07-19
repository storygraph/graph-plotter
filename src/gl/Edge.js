import GLProg from '../gl/GLProg';
import Colors from '../graph/Colors';

const RELATIONBOW = {
	FRIENDSHIP: "F",
	LOVE: "L",
	HATRED: "H",
	NEUTRALITY: "N",
}

class Edge {
	constructor(a, b, type, gl, glProg, canvas, shaderProg, offset) {
		this.a = a;
		this.b = b;
		this.type = type;
		this.gl = gl;
		this.glProg = glProg;
		this.canvas = canvas;
		this.shaderProg = shaderProg;
		this.offset = offset;
	}

	calculateVertices(zoom) {
		let ratio = this.canvas.width / this.canvas.height;
		let ax = this.a.x * ratio;
		let bx = this.b.x * ratio;
		let ay = this.a.y;
		let by = this.b.y;
		let cx = (ax + bx) / 2;
		let cy = (ay + by) / 2;
		let scale = 0.007 * zoom;
		let tex_size = 5 * scale;


		let len = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
		let norm = [(ax - bx) / len * scale, (ay - by) / len * scale];


		let vertices = [
			ax - norm[1], ay + norm[0], 0, 0,
			ax + norm[1], ay - norm[0], 0, 0,
			bx - norm[1], by + norm[0], 0, 0,
			bx + norm[1], by - norm[0], 0, 0,
			cx - tex_size, cy - tex_size, 0, 1,
			cx + tex_size, cy - tex_size, 1, 1,
			cx - tex_size, cy + tex_size, 0, 0,
			cx + tex_size, cy + tex_size, 1, 0
		]

		return vertices;
	}

	draw(index, zoom) {
		const INDEX = this.gl.getUniformLocation(this.shaderProg, "uIndex");
		this.gl.uniform1i(INDEX, 4096 + index);

		const TEX_MODE = this.gl.getUniformLocation(this.shaderProg, "uTextureMode");
		this.gl.uniform1i(TEX_MODE, false);

		let vertBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertBuffer);

		let vertices = this.calculateVertices(zoom);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

		const aXY = this.gl.getAttribLocation(this.shaderProg, "aXY")
		this.gl.vertexAttribPointer(aXY, 2, this.gl.FLOAT, false, 4 * GLProg.FLOAT_SIZE, 0 * GLProg.FLOAT_SIZE);
		this.gl.enableVertexAttribArray(aXY);

		const OFF_COORD = this.gl.getUniformLocation(this.shaderProg, "uOffset");
		this.gl.uniform2fv(OFF_COORD, this.offset);

		const aST = this.gl.getAttribLocation(this.shaderProg, "aST");
		this.gl.enableVertexAttribArray(aST);
		this.gl.vertexAttribPointer(aST, 2, this.gl.FLOAT, false, 4 * GLProg.FLOAT_SIZE, 2 * GLProg.FLOAT_SIZE);

		const COLOR_COORD = this.gl.getUniformLocation(this.shaderProg, "uColor");
		let color = this.getCol(this.type);
		this.gl.uniform3fv(COLOR_COORD, color);

		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

		this.gl.uniform1i(TEX_MODE, true);

		const uSampler = this.gl.getUniformLocation(this.shaderProg, "uSampler");

		this.gl.activeTexture(this.gl.TEXTURE0);

		let icon = this.getIcon(this.type);
		this.gl.bindTexture(this.gl.TEXTURE_2D, icon)
		
		this.gl.uniform1i(uSampler, 0);

		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 4, 4);

		this.gl.uniform1i(TEX_MODE, false);
	}

	getIcon(type) {
		switch (type) {
			case RELATIONBOW.HATRED:
				return this.glProg.hatred;
			case RELATIONBOW.FRIENDSHIP:
				return this.glProg.friendship;
			case RELATIONBOW.LOVE:
				return this.glProg.love;
			default:
				return this.glProg.neutrality;
		}
	}

	getCol(type) {
		switch (type) {
			case RELATIONBOW.HATRED:
				return Colors.HATRED;
			case RELATIONBOW.FRIENDSHIP:
				return Colors.MELON;
			case RELATIONBOW.LOVE:
				return Colors.LOVE;
			default:
				return Colors.NEUTRALITY;
		}
	}

	static get RELATIONBOW() {
		return RELATIONBOW;
	}
}

export default Edge;