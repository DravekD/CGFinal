//Boxes are used as tiles to build the maze.
//Everything here is represented in world space.
class Box
{
    constructor(p, s)
    {
        this.p1 = vec3(p[0] - (s / 2), p[1] - (s / 2), p[2] - (s / 2));
        this.p2 = vec3(p[0] + (s / 2), p[1] + (s / 2), p[2] + (s / 2));
    }
	/*constructor(p1, p2)
	{
		this.p1 = p1;
		this.p2 = p2;
		return this;
	}*/
	get vertices()
	{
		return this.calculate(this.p1, this.p2);
	}
	calculate(p1, p2)
	{
		var vertices = [];
		vertices = 
		[
            //Front
			vec3(p1[0], p1[1], p1[2]),
            vec3(p2[0], p1[1], p1[2]),
            vec3(p1[0], p2[1], p1[2]),
            vec3(p2[0], p1[1], p1[2]),
            vec3(p1[0], p2[1], p1[2]),
            vec3(p2[0], p2[1], p1[2]),

            //Back
            vec3(p1[0], p1[1], p2[2]),
            vec3(p2[0], p1[1], p2[2]),
            vec3(p1[0], p2[1], p2[2]),
            vec3(p2[0], p1[1], p2[2]),
            vec3(p1[0], p2[1], p2[2]),
            vec3(p2[0], p2[1], p2[2]),

            //Bottom
            vec3(p1[0], p1[1], p1[2]),
            vec3(p2[0], p1[1], p1[2]),
            vec3(p1[0], p1[1], p2[2]),
            vec3(p1[0], p1[1], p2[2]),
            vec3(p2[0], p1[1], p2[2]),
            vec3(p2[0], p1[1], p1[2]),

            //Top
            vec3(p1[0], p2[1], p1[2]),
            vec3(p2[0], p2[1], p1[2]),
            vec3(p1[0], p2[1], p2[2]),
            vec3(p1[0], p2[1], p2[2]),
            vec3(p2[0], p2[1], p2[2]),
            vec3(p2[0], p2[1], p1[2]),

            //Right Side
            vec3(p2[0], p1[1], p1[2]),
            vec3(p2[0], p2[1], p1[2]),
            vec3(p2[0], p1[1], p2[2]),
            vec3(p2[0], p1[1], p2[2]),
            vec3(p2[0], p2[1], p2[2]),
            vec3(p2[0], p2[1], p1[2]),

            //Left Side
            vec3(p1[0], p1[1], p1[2]),
            vec3(p1[0], p2[1], p1[2]),
            vec3(p1[0], p1[1], p2[2]),
            vec3(p1[0], p1[1], p2[2]),
            vec3(p1[0], p2[1], p2[2]),
            vec3(p1[0], p2[1], p1[2]),
		];
		return vertices;
	}
}

//Camera has a position and an orientation.
//World space representation.
//Rotations stored in radians.
class Camera
{
    constructor()
    {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
        this.x_rotation = 60.0;
        this.y_rotation = 60.0;
        this.z_rotation = 0.0;
        this.movement_speed = 0.2;
        this.rotation_speed = 2.0;
        return this;
    }
    get translation()
    {
        return vec3(this.x, this.y, this.z);
    }
    get rotationX()
    {
        return this.x_rotation;
    }
    get rotationY()
    {
        return this.y_rotation;
    }
    get rotationZ()
    {
        return this.z_rotation;
    }
    moveUp()
    {
        this.y += this.movement_speed;
        this.y = Math.round(this.y * 100) / 100;
    }
    moveLeft()
    {
        this.x -= this.movement_speed;
        this.x = Math.round(this.x * 100) / 100;
    }
    moveDown()
    {
        this.y -= this.movement_speed;
        this.y = Math.round(this.y * 100) / 100;
    }
    moveRight()
    {
        this.x += this.movement_speed;
        this.x = Math.round(this.x * 100) / 100;

    }
    rotateUp()
    {
        this.x_rotation -= this.rotation_speed;
        this.x_rotation = Math.round(this.x_rotation * 100) / 100;

    }
    rotateLeft()
    {
        this.y_rotation -= this.rotation_speed;
        this.y_rotation = Math.round(this.y_rotation * 100) / 100;
    }
    rotateDown()
    {
        this.x_rotation += this.rotation_speed;
        this.x_rotation = Math.round(this.x_rotation * 100) / 100;

    }
    rotateRight()
    {
        this.y_rotation += this.rotation_speed;
        this.y_rotation = Math.round(this.y_rotation * 100) / 100;
    }
}

//Globals
var gl;
var cam = new Camera();

//Check for inputs.
window.addEventListener("keydown", function (event)
{
    {
        if (event.keyCode !== undefined)
        {
            //Relevant keycodes.
            {
                var w = 87;
                var a = 65;
                var s = 83;
                var d = 68;
                var up = 38;
                var left = 37;
                var down = 40;
                var right = 39;
            }
            //WASD to move.
            if (event.keyCode == w)
            {
                cam.moveUp();
                main();
            }
            else if (event.keyCode == a)
            {
                cam.moveLeft();
                main();
            }
            else if (event.keyCode == s)
            {
                cam.moveDown();
                main();
            }
            else if (event.keyCode == d)
            {
                cam.moveRight();
                main();
            }
            //Arrow keys to rotate.
            else if (event.keyCode == up)
            {
                cam.rotateUp();
                main();
            }
            else if (event.keyCode == left)
            {
                cam.rotateLeft();
                main();
            }
            else if (event.keyCode == down)
            {
                cam.rotateDown();
                main();
            }
            else if (event.keyCode == right)
            {
                cam.rotateRight();
                main();
            }
        }
    }
}, false);

window.onload = function init()
{
    //Handle WebGL.
    main();
};

function main()
{
    //Initialize WebGL.
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl)
    {
        alert("WebGL isn't available");
    }

    //Large variable definitions.
    const textureCoordinates = [
    // Front
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Back
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Top
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Bottom
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Right
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Left
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    ];

    const box = new Box(vec3(0.0, 0.0, -2.0), 0.1);
    const box2 = new Box(vec3(0.0, 0.0, 2.0), 1.0);
    const box3 = new Box(vec3(0.0, -2.0, 0.0), 1.0);
    const box4 = new Box(vec3(0.0, 2.0, 0.0), 1.0);
    const box5 = new Box(vec3(-2.0, 0.0, 0.0), 1.0);
    const box6 = new Box(vec3(2.0, 0.0, 0.0), 1.0);

    //Load the texture to be applied to the cubes.
    const texture = loadTexture(gl);

    //Create the data. Each square is 1x1x1.
    var vertices = [];
    vertices = vertices.concat(box.vertices);
    vertices = vertices.concat(box2.vertices);
    vertices = vertices.concat(box3.vertices);
    vertices = vertices.concat(box4.vertices);
    vertices = vertices.concat(box5.vertices);
    vertices = vertices.concat(box6.vertices);

    //Initialize WebGL.
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    //Set up the shaders.
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    //Build the vertices buffer.
    var vertBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    //Define how the vertex array is used.
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    //Build the texture mapping buffer.
    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    //Define how the texture array is used.
    var aTextureCoord = gl.getAttribLocation(program, "aTextureCoord");
    gl.vertexAttribPointer(aTextureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aTextureCoord);

    //Calculate coordinate space changes.
    const matrices = calcMatrices();

    //Set the uniform variables in the vertex shader.
    var uProjectionMatrix = gl.getUniformLocation(program, "uProjectionMatrix");
    gl.uniformMatrix4fv(uProjectionMatrix, false, matrices[0]);
    var uModelViewMatrix = gl.getUniformLocation(program, "uModelViewMatrix");
    gl.uniformMatrix4fv(uModelViewMatrix, false, matrices[1]);

    //Set the location for and bind the texture.
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    var uTexture = gl.getUniformLocation(program, "uTexture");
    gl.uniform1i(uTexture, 0);

    //Draw the data to the screen.
    render(vertices.length);
}

//Clears the screen and draws the data.
function render(draw_num)
{
    console.log("rendering");
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, draw_num);
}

function mat4view()
{
    var translationVector = cam.translation;
    var translationMatrix = [
        1.0, 0.0, 0.0, translationVector[0],
        0.0, 1.0, 0.0, translationVector[1],
        0.0, 0.0, 1.0, translationVector[2],
        0.0, 0.0, 0.0, 1.0
    ];
    var cameraMatrix = mat4xRotate(translationMatrix, cam.x_rotation);
    cameraMatrix = mat4yRotate(cameraMatrix, cam.y_rotation);
    cameraMatrix = mat4zRotate(cameraMatrix, cam.z_rotation);
    return mat4inversion(cameraMatrix);
}

//Returns the inversion of the given matrix.
function mat4inversion(a)
{
    /*
    //[0][0], [1][0], [2][0], [3][0]
    //[0][1], [1][1], [2][1], [3][1]
    //[0][2], [1][2], [2][2], [3][2]
    //[0][3], [1][3], [2][3], [3][3]
    */
    var s = [];
    s.push(a[0] * a[5] - a[1] * a[4]);
    s.push(a[0] * a[9] - a[1] * a[8]);
    s.push(a[0] * a[13] - a[1] * a[12]);
    s.push(a[4] * a[9] - a[5] * a[8]);
    s.push(a[4] * a[13] - a[5] * a[12]);
    s.push(a[8] * a[13] - a[9] * a[12]);
    var c = [];
    c.push(a[2] * a[7] - a[3] * a[6]);
    c.push(a[2] * a[11] - a[3] * a[10]);
    c.push(a[2] * a[15] - a[3] * a[14]);
    c.push(a[6] * a[11] - a[7] * a[10]);
    c.push(a[6] * a[15] - a[7] * a[14]);
    c.push(a[10] * a[15] - a[11] * a[14]);
    var inv_det = s[0] * c[5] - s[1] * c[4] + s[2] * c[3] + s[3] * c[2] - s[4] * c[1] + s[5] * c[0];
    inv_det = 1.0 / inv_det;
    var vals = [
        inv_det, inv_det, inv_det, inv_det,
        inv_det, inv_det, inv_det, inv_det,
        inv_det, inv_det, inv_det, inv_det,
        inv_det, inv_det, inv_det, inv_det
    ];

    vals[0] *= (a[5] * c[5] - a[9] * c[4] + a[13] * c[3]);
    vals[4] *= (-1.0 * a[4] * c[5] + a[8] * c[4] - a[12] * c[3]);
    vals[8] *= (a[7] * s[5] - a[11] * s[4] + a[15] * s[3]);
    vals[12] *= (-1.0 * a[6] * s[5] + a[10] * s[4] - a[14] * s[3]);
    vals[1] *= (-1.0 * a[1] * c[5] + a[9] * c[2] - a[13] * c[1]);
    vals[5] *= (a[0] * c[5] - a[8] * c[2] + a[12] * c[1]);
    vals[9] *= (-1.0 * a[3] * s[5] + a[11] * s[2] - a[15] * s[1]);
    vals[13] *= (a[2] * s[5] - a[10] * s[2] + a[14] * s[1]);
    vals[2] *= (a[1] * c[4] - a[5] * c[2] + a[13] * c[0]);
    vals[6] *= (-1.0 * a[0] * c[4] + a[4] * c[2] - a[12] * c[0]);
    vals[10] *= (a[3] * s[4] - a[7] * s[2] + a[15] * s[0]);
    vals[14] *= (-1.0 * a[2] * s[4] + a[6] * s[2] - a[14] * s[0]);
    vals[3] *= (-1.0 * a[1] * c[3] + a[5] * c[1] - a[9] * c[0]);
    vals[7] *= (a[0] * c[3] - a[4] * c[1] + a[8] * c[0]);
    vals[11] *= (-1.0 * a[3] * s[3] + a[7] * s[1] - a[11] * s[0]);
    vals[15] *= (a[2] * s[3] - a[6] * s[1] + a[10] * s[0]);

    return vals;
}

//Calculates a perspective matrix based on the given values.
function mat4Perspective(fieldOfView, aspect, zNear, zFar)
{
    var vals = [];
    vals.push((1.0 / Math.tan(fieldOfView / 2)) / aspect);
    vals.push(0.0);
    vals.push(0.0);
    vals.push(0.0);

    vals.push(0.0);
    vals.push((1.0 / Math.tan(fieldOfView / 2)));
    vals.push(0.0);
    vals.push(0.0);

    vals.push(0.0);
    vals.push(0.0);
    vals.push((zFar + zNear) * (1 / (zNear - zFar)));
    vals.push(-1.0);

    vals.push(0.0);
    vals.push(0.0);
    vals.push((2 * zNear * zFar) * (1 / (zNear - zFar)));
    vals.push(0.0);

    return vals;
}

//Calculates the Model View Matrix.
function mat4ModelView(translation, xRotation, yRotation, zRotation)
{
    /*
    //Take the object's translation, subtract the camera's translation, then rotate it about the X, Y, and Z axes to get the same rotation. Add back the camera's translation
    //to get the world coordinate representation.
    */
    var vals = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
    vals = mat4Translate(vals, translation);
    vals = mat4Rotate(vals, xRotation, translation);
    vals = mat4Rotate(vals, yRotation, translation);
    vals = mat4Rotate(vals, zRotation, translation);

    return vals;
}

//Rotates the given matrix by the given angle in radians along the given axis.
function mat4Rotate(given, rads, gAxis)
{
    var vals = [];
    //Invert the axis because it is based on a camera.
    var axis = new vec3((-1.0) * gAxis[0], (-1.0) * gAxis[1], (-1.0) * gAxis[2]);
    let len = (Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]));

    //The rotation would cause errors due to number precision.
    if (Math.abs(len) < 0.000001)
    {
        return given;
    }

    len = 1 / len;

    let x = axis[0] * len;
    let y = axis[1] * len;
    let z = axis[2] * len;
    let s = Math.sin(rads);
    let c = Math.cos(rads);
    let t = 1 - c;
    let a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
    a00 = given[0]; a01 = given[1]; a02 = given[2]; a03 = given[3];
    a10 = given[4]; a11 = given[5]; a12 = given[6]; a13 = given[7];
    a20 = given[8]; a21 = given[9]; a22 = given[10]; a23 = given[11];
    let b00, b01, b02, b10, b11, b12, b20, b21, b22;
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    vals.push(a00 * b00 + a10 * b01 + a20 * b02);
    vals.push(a01 * b00 + a11 * b01 + a21 * b02);
    vals.push(a02 * b00 + a12 * b01 + a22 * b02);
    vals.push(a03 * b00 + a13 * b01 + a23 * b02);
    vals.push(a00 * b10 + a10 * b11 + a20 * b12);
    vals.push(a01 * b10 + a11 * b11 + a21 * b12);
    vals.push(a02 * b10 + a12 * b11 + a22 * b12);
    vals.push(a03 * b10 + a13 * b11 + a23 * b12);
    vals.push(a00 * b20 + a10 * b21 + a20 * b22);
    vals.push(a01 * b20 + a11 * b21 + a21 * b22);
    vals.push(a02 * b20 + a12 * b21 + a22 * b22);
    vals.push(a03 * b20 + a13 * b21 + a23 * b22);
    vals.push(given[12]);
    vals.push(given[13]);
    vals.push(given[14]);
    vals.push(given[15]);

    return vals;
}

//Rotates the given matrix along the X-axis.
function mat4xRotate(a, deg)
{
    var c = Math.cos(deg * Math.PI / 180);
    var s = Math.sin(deg * Math.PI / 180);
    var mat = [
        1.0, 0.0, 0.0, 0.0,
        0.0, c, s, 0.0,
        0.0, -1.0 * s, c, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    return mat4Multiply(a, mat);
}

//Rotates the given matrix along the Y-axis.
function mat4yRotate(a, deg)
{
    var c = Math.cos(deg * Math.PI / 180);
    var s = Math.sin(deg * Math.PI / 180);
    var mat = [
        c, 0.0, -1.0 * s, 0.0,
        0.0, 1.0, 0.0, 0.0,
        s, 0.0, c, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    return mat4Multiply(a, mat);
}

//Rotates the given matrix along the Z-axis.
function mat4zRotate(a, deg)
{
    var c = Math.cos(deg * Math.PI / 180);
    var s = Math.sin(deg * Math.PI / 180);
    var mat = [
        c, s, 0.0, 0.0,
        -1.0 * s, c, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    return mat4Multiply(a, mat);
}

//Translates the given matrix by the given vector.
function mat4Translate(given, inVec)
{
    var vals = [
        1.0, 0.0, 0.0, inVec[0],
        0.0, 1.0, 0.0, inVec[1],
        0.0, 0.0, 1.0, inVec[2],
        0.0, 0.0, 0.0, 1.0,
    ];
    return mat4Multiply(given, vals);
}

//Multiplies two matrices together.
function mat4Multiply(a, b)
{
    return [
        a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
        a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
        a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
        a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],

        a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
        a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
        a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
        a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],

        a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
        a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
        a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
        a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],

        a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
        a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
        a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
        a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
    ];
}

function vecMult(a, b)
{
    vals = [
        a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3],
        a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7] * b[3],
        a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11] * b[3],
        a[12] * b[0] + a[13] * b[1] + a[14] * b[2] + a[15] * b[3]
    ];
    return vals;
}

//Calculates the projection and model view matrices.
function calcMatrices()
{
    const fieldOfView = Math.PI / 4;
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const ProjectionMatrix = mat4Perspective(fieldOfView, aspect, zNear, zFar);

    const ModelViewMatrix = mat4view();

    return [ProjectionMatrix, ModelViewMatrix];
}

//Create the texture, initialize it, and update it when the image loads.
//Adapted from https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL
function loadTexture(gl)
{
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    const level = 0;
    const internal_format = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const src_format = gl.RGBA;
    const src_type = gl.UNSIGNED_BYTE;
    const init_pixel = new Uint8Array([255, 0, 0, 255]);

    gl.texImage2D(gl.TEXTURE_2D, level, internal_format, width, height, border, src_format,
        src_type, init_pixel);

    const image = new Image();
    image.onload = function ()
    {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, level, internal_format, src_format, src_type, image);
        gl.generateMipmap(gl.TEXTURE_2D);
    };
    image.src = "tile.png";

    return texture;
}