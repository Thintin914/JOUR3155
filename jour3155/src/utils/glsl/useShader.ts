export function getCanvas(name: string){
  const c = document.getElementById(name) as HTMLCanvasElement;
  return c;
}

export function getGL(name: string) {
  const c = getCanvas(name);
  const gl = c.getContext("webgl") as WebGLRenderingContext;

  return gl;
}

export function getCanvasAspectRation(name: string){
  const c = getCanvas(name)
  return c.width / c.height;
}

export function loadShader(gl: WebGLRenderingContext, type: number, shader: string) {
    const s = gl.createShader(type);
    if (!s) return;
    gl.shaderSource(s, shader);
    gl.compileShader(s);
    return s;
}

export function createShader(name: string, vert: string, frag: string){
    const gl = getGL(name);
    if (!gl) return null;
  
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vert);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, frag);
    const program = gl.createProgram();
    if (!vertexShader) return;
    if (!fragmentShader) return;
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
  
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  
    const positionBuffer = gl.createBuffer();
  
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  // fill it with a 2 triangles that cover clipspace
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  // first triangle
     1, -1,
    -1,  1,
    -1,  1,  // second triangle
     1, -1,
     1,  1,
  ]), gl.STATIC_DRAW);
  
  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);
  
  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);
  
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  gl.vertexAttribPointer(
      positionAttributeLocation,
      2,          // 2 components per iteration
      gl.FLOAT,   // the data is 32bit floats
      false,      // don't normalize the data
      0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
      0,          // start at the beginning of the buffer
  );
  
  gl.drawArrays(
      gl.TRIANGLES,
      0,     // offset
      6,     // num vertices to process
  );

  return {gl: gl, program: program};
}