import { createShader } from "./useShader";
import { basicVertShader, waveFragShader } from "./shaders";
import { addGLToUpdate } from "./updateShaders";

export function createWaveShader(name: string, r: number, g: number, b: number, speed: number){

    var temp = createShader(name, basicVertShader, waveFragShader);
    if (!temp) return;

    var gl = temp.gl;
    var program = temp.program;

    var location = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(location, gl.canvas.width, gl.canvas.height);

    location = gl.getUniformLocation(program, "time");
    gl.uniform1f(location, Math.random() * 10000);

    location = gl.getUniformLocation(program, "color");
    gl.uniform3f(location, r / 255, g / 255, b / 255);

    addGLToUpdate(name, gl, program, speed);
}
  
export function createSlowWaveShader(name: string, r: number, g: number, b: number, speed: number){
    var temp = createShader(name, basicVertShader, waveFragShader);
    if (!temp) return;

    var gl = temp.gl;
    var program = temp.program;

    var location = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(location, gl.canvas.width, gl.canvas.height);

    location = gl.getUniformLocation(program, "time");
    gl.uniform1f(location, Math.random() * 10000);

    location = gl.getUniformLocation(program, "color");
    gl.uniform3f(location, r / 255, g / 255, b / 255);

    addGLToUpdate(name, gl, program, speed);
}