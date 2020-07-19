const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

class GLProg {
    constructor(vSource, fSource, gl) {
        this.vSource = vSource;
        this.fSource = fSource;
        this.icons = [];
        this.gl = gl;
    }

    getShader(source, type) {
        let shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
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

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            alert(this.gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

    switchProgram(prog) {
        this.gl.useProgram(prog);
        this.getVariables(prog);
        this.getIcons();
    }

    // Finds the addresses of all uniform and attribute variables.
    getVariables(shaderProg) {
        for (let i = 0; i < this.gl.getProgramParameter(shaderProg, this.gl.ACTIVE_UNIFORMS); ++i) {
            let name = this.gl.getActiveUniform(shaderProg, i).name;
            window[name] = this.gl.getUniformLocation(shaderProg, name);
        }

        for (let i = 0; i < this.gl.getProgramParameter(shaderProg, this.gl.ACTIVE_ATTRIBUTES); ++i) {
            let name = this.gl.getActiveAttrib(shaderProg, i).name;
            window[name] = this.gl.getAttribLocation(shaderProg, name);
        }
    }

    getIcons() {
        this.love = this.loadTexture(require('../img/icon/love_icon.png'));
        this.hatred = this.loadTexture(require('../img/icon/hatred_icon.png'));
        this.friendship = this.loadTexture(require('../img/icon/friendship_icon.png'));
        this.neutrality = this.loadTexture(require('../img/icon/neutrality_icon.png'));
    }

    loadTexture(url) {
        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Because images have to be download over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 0, 0]);  // opaque blue
        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat,
                        width, height, border, srcFormat, srcType,
                        pixel);

        const image = new Image();

        let gl = this.gl;
        image.onload = function() {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);

            function isPowerOf2(value) {
                return (value & (value - 1)) == 0;
            }

            // WebGL1 has different requirements for power of 2 images
            // vs non power of 2 images so check if the image is a
            // power of 2 in both dimensions.
            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
                } else {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.src = url;

        return texture;
    }

    static get FLOAT_SIZE() {
        return FLOAT_SIZE;
    }
}

export default GLProg;