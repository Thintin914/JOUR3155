
import { getGL, loadShader } from "./useShader";
import { addGLToUpdate, addNeedResizeGL, getGLProgram } from "./updateShaders";

const cachedImages: {[key: string]: HTMLImageElement} = {};

export async function loadImages(
    name: string,
    fragShader: string,
    vertShader: string,
    urls: string[],
    speed: number,
    callback: (name: string, gl: WebGLRenderingContext, program: WebGLProgram, images: HTMLImageElement[]) => void
  ) {
    var images: HTMLImageElement[] = [];
    var imagesToLoad = urls.length;
    var _length = urls.length;

    // Called each time an image finished
    // loading.
    var onImageLoad = function () {
      
      imagesToLoad--;
      // If all the images are loaded call the callback.
      if (imagesToLoad === 0) {
        const gl = getGL(name);
        if (!gl) {
          return;
        }

        // setup GLSL program
        const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertShader);
        if (!vertexShader) return;
      
        const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragShader);
        if (!fragmentShader) return;
        const program = gl.createProgram();
        if (!program) return;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        callback(name, gl, program, images);
        addGLToUpdate(name, gl, program, speed);
        addNeedResizeGL(name, images[0].width / images[0].height);
      }
    };
  
    for (var ii = 0; ii < _length; ++ii) {
      if (cachedImages[urls[ii]]){
        images.push(cachedImages[urls[ii]]);
      }else{
        var image = await loadImage(urls[ii]);
        cachedImages[urls[ii]] = image;
        images.push(image);
      }
      onImageLoad();
    }
  }
  
  async function loadImage(url: string) {
    let img = new Image();
    const imageLoadPromise = new Promise(resolve => {
        img.src = url;
        img.onload = resolve
    });
    await imageLoadPromise;
    return img;
  }
  
  export function render(name: string, gl: WebGLRenderingContext, program: WebGLProgram, images: HTMLImageElement[]) {
  
    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var texcoordLocation = gl.getAttribLocation(program, "a_texCoord");
  
    // Create a buffer to put three 2d clip space points in
    var positionBuffer = gl.createBuffer();
  
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Set a rectangle the same size as the image.
    setRectangle(gl, 0, 0, gl.canvas.width, gl.canvas.height);
  
    // provide texture coordinates for the rectangle.
    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );
  
    // create n textures
    var textures = [];
    for (var ii = 0; ii < images.length; ++ii) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
  
      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  
      // Upload the image into the texture.
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        images[ii]
      );
  
      // add the texture to the array of textures.
      textures.push(texture);
    }

    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Turn on the texcoord attribute
    gl.enableVertexAttribArray(texcoordLocation);

    // bind the texcoord buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

    // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

    // set which texture units to render with.
    // lookup the sampler locations.

    for(let i = 0; i < images.length; i++){
        let imageLocation = gl.getUniformLocation(program, "u_image" + i);
        gl.uniform1i(imageLocation, i);
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, textures[i]);
    }

    // Draw the rectangle.
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  
    function setRectangle(
      gl: WebGLRenderingContext,
      x: number,
      y: number,
      width: number,
      height: number
    ) {
      var x1 = x;
      var x2 = x + width;
      var y1 = y;
      var y2 = y + height;
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
        gl.STATIC_DRAW
      );
    }