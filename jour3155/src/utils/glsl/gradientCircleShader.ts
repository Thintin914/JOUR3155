import { basicVertShader, gradientCircleFragShader } from "./shaders";
import { addGLToUpdate } from "./updateShaders";
import { createShader } from "./useShader";



export async function createGradientCircleShader(name: string, speed: number, r: number, g: number, b: number, radius: number){
    var temp = createShader(name, basicVertShader, gradientCircleFragShader);
    if (!temp) return;

    var gl = temp.gl;
    var program = temp.program;

    var location = gl.getUniformLocation(program, "resolution");
    gl.uniform2f(location, gl.canvas.width, gl.canvas.height);

    location = gl.getUniformLocation(program, "time");
    gl.uniform1f(location, Math.random() * 10000);

    location = gl.getUniformLocation(program, "val");
    gl.uniform3f(location, r / 255, g / 255, b / 255);

    location = gl.getUniformLocation(program, "baseRadius");
    gl.uniform1f(location, radius);

    addGLToUpdate(name, gl, program, speed);
}