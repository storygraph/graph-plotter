const VERT_CODE = `
	attribute vec2 aXY;
	uniform float uRatio;
	uniform float uZoom;
    uniform vec2 uOffset;
    uniform vec3 uColor;

	void main(void) {
		gl_Position = vec4( (aXY.x/uRatio + uOffset.x) * uZoom, (aXY.y + uOffset.y) * uZoom, 0.0, 1.0);
	}
`;

const FRAG_CODE = `
    precision highp float;
    uniform vec3 uColor;
    
	void main(void) {
		gl_FragColor = vec4(uColor, 1.0);
	}
`;

class FlatShader {
    constructor() {}

    static get VERT_CODE() {
        return VERT_CODE;
    }

    static get FRAG_CODE() {
        return FRAG_CODE;
    }
}

export default FlatShader;