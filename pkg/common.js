const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;

function getShader(source, type) {
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function getProgram(vSource, fSource) {
    let vShader = getShader(vSource, gl.VERTEX_SHADER);
    let fShader = getShader(fSource, gl.FRAGMENT_SHADER);

    if (!vShader || !fShader) { return null; }

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vShader);
    gl.attachShader(shaderProgram, fShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    {
        alert(gl.getProgramInfoLog(shaderProgram));
        return null;
    }

    return shaderProgram;
}

function switchProgram(prog) {
    gl.useProgram(prog);
    getVariables();
}

// Finds the addresses of all uniform and attribute variables.
function getVariables() {
    for (let i = 0; i < gl.getProgramParameter(shaderProg, gl.ACTIVE_UNIFORMS); ++i)
    {
        let name = gl.getActiveUniform(shaderProg, i).name;
        window[name] = gl.getUniformLocation(shaderProg, name);
    }

    for (let i = 0; i < gl.getProgramParameter(shaderProg, gl.ACTIVE_ATTRIBUTES); ++i)
    {
        let name = gl.getActiveAttrib(shaderProg, i).name;
        window[name] = gl.getAttribLocation(shaderProg, name);
    }
}