import { basicImageVertShader, cityscapeFragShader } from "./shaders";
import { addNeedScrollGL, getGLProgram } from "./updateShaders";
import { loadImages, render } from "./useImageShader";


export async function createCityscapeShader(name: string, images: string[], speed: number, parallexX: number, parallexY: number, scrollRate: number){
    await loadImages(name, cityscapeFragShader, basicImageVertShader, images, speed, render);

    addNeedScrollGL(name, 1);

    let program = getGLProgram(name);
    let parallexLocation = program.gl.getUniformLocation(program.program, 'parallex');
    program.gl.uniform2f(parallexLocation, parallexX, parallexY);

    let scrollRateLocation = program.gl.getUniformLocation(program.program, 'scrollRate');
    program.gl.uniform1f(scrollRateLocation, scrollRate);

}