import { basicImageVertShader, diagonalFragShader } from "./shaders";
import { getGLProgram } from "./updateShaders";
import { loadImages, render } from "./useImageShader";

export async function createDiagonalShader(name: string, images: string[], speed: number, scale: number, r: number, g: number, b: number){
    await loadImages(name, diagonalFragShader, basicImageVertShader, images, speed, render);
    
    let program = getGLProgram(name);
    let colorLocation = program.gl.getUniformLocation(program.program, 'c');
    program.gl.uniform3f(colorLocation, r / 255, g / 255, b / 255);
    let amountLocation = program.gl.getUniformLocation(program.program, 'amount');
    program.gl.uniform1f(amountLocation, scale);
}