const VERT_CODE = `
	attribute vec2 aXY;
    attribute vec2 aST;
    
    uniform float uRatio;
	uniform float uZoom;
    uniform vec2 uOffset;
    uniform vec3 uColor;
    uniform bool uSelectMode;
    uniform bool uTextureMode;
    uniform int uIndex;

    varying highp vec2 vST;

    void main(void) 
    {
		gl_Position = vec4((aXY.x/uRatio + uOffset.x) * uZoom, (aXY.y + uOffset.y) * uZoom, 0.0, 1.0);
        vST = aST;
    }
`;

const FRAG_CODE = `

    varying highp vec2 vST;

    precision highp float;
    precision highp int;
    uniform vec3 uColor;
    uniform bool uSelectMode;
    uniform bool uTextureMode;
    uniform int uIndex;
    uniform sampler2D uSampler;

    vec3 indexToColor()
    {
        //vertex: 0 - 2^12-1
        //edge: 2^12 - 2^24

        float rValue = float(uIndex / 256 / 256);
        float gValue = float(uIndex / 256 - int(rValue * 256.0));
        float bValue = float(uIndex - int(rValue * 256.0 * 256.0) - int(gValue * 256.0));
        return vec3(rValue / 255.0, gValue / 255.0, bValue / 255.0);
    }

    void main(void) 
    {

        if (uSelectMode) 
        {
            gl_FragColor = vec4(indexToColor(), 1.0);
        }
        else 
        {
            if (uTextureMode)
            {
                gl_FragColor = texture2D(uSampler, vST);
            }
            else
            {
                gl_FragColor = vec4(uColor, 1.0);   
            }
        }
    }
`;

class FlatShader {
    static get VERT_CODE() {
        return VERT_CODE;
    }

    static get FRAG_CODE() {
        return FRAG_CODE;
    }
}

export default FlatShader;