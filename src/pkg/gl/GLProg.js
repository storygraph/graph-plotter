const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

class GLProg {
    constructor(vSource, fSource, gl) {
        this.vSource = vSource;
        this.fSource = fSource;
        this.gl = gl;
    }

    getShader(source, type) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
    
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
        {
            alert(this.gl.getShaderInfoLog(shader));
            return null;
        }
    
        return shader;
    }

    getProgram() {
        let vShader = this.getShader(this.vSource, this.gl.VERTEX_SHADER);
        let fShader = this.getShader(this.fSource, this.gl.FRAGMENT_SHADER);
    
        if (!vShader || !fShader) { return null; }
    
        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vShader);
        this.gl.attachShader(shaderProgram, fShader);
        this.gl.linkProgram(shaderProgram);
    
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
        {
            alert(this.gl.getProgramInfoLog(shaderProgram));
            return null;
        }
    
        return shaderProgram;
    }

    switchProgram(prog) {
        this.gl.useProgram(prog);
        this.getVariables(prog);
    }

    // Finds the addresses of all uniform and attribute variables.
    getVariables(shaderProg) {
        for (let i = 0; i < this.gl.getProgramParameter(shaderProg, this.gl.ACTIVE_UNIFORMS); ++i)
        {
            let name = this.gl.getActiveUniform(shaderProg, i).name;
            window[name] = this.gl.getUniformLocation(shaderProg, name);
        }

        for (let i = 0; i < this.gl.getProgramParameter(shaderProg, this.gl.ACTIVE_ATTRIBUTES); ++i)
        {
            let name = this.gl.getActiveAttrib(shaderProg, i).name;
            window[name] = this.gl.getAttribLocation(shaderProg, name);
        }
    }

    static get FLOAT_SIZE() {
        return FLOAT_SIZE;
    }
}

export default GLProg;