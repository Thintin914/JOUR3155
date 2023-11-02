let allGL: { [name: string]: {gl: WebGLRenderingContext, program: WebGLProgram, speed: number} } = {};
let needResizeGLs: {[name: string]: {aspectRatio: number}} = {};
let needScrollGLs: {[name: string]: {speed: number}} = {};
export let mousePos: {x: number, y: number} = {x: 0, y: 0};
export let mouseScroll: {x: number, y: number} = {x: 0, y: 0};

export function addNeedScrollGL(name: string, speed: number){
    needScrollGLs[name] = {speed: speed};
    setScrollUniform(name);
}

export function addNeedResizeGL(name: string, aspectRatio: number){
    needResizeGLs[name] = {aspectRatio: aspectRatio};
    setResizeUniform(name);
}

export function addGLToUpdate(name: string, gl: WebGLRenderingContext, program: WebGLProgram, speed: number){
    allGL[name] = {gl: gl, program: program, speed: speed};
}

export function getGLProgram(name: string){
    return allGL[name];
}

export function removeGLs(blacklist: string[]){
    for(let name in allGL){
        if (!blacklist.includes(name)){
            let gl = allGL[name].gl;
            if (gl)
            gl.getExtension("WEBGL_lose_context")!.loseContext();

            delete allGL[name];
            delete needResizeGLs[name];
            delete needScrollGLs[name];
        }
    }
}

function step(){
    for(let name in allGL){
        let prop = allGL[name];

        var location = prop.gl.getUniformLocation(prop.program, "mouse");
        if (location){
            let c = prop.gl.canvas as HTMLElement;
            var rect = c.getBoundingClientRect();
            var x = (mousePos.x - rect.left) / c.clientWidth;
            var y = -(mousePos.y - rect.bottom) / c.clientHeight;
            prop.gl.uniform2f(location, x, y);
        }

         location = prop.gl.getUniformLocation(prop.program, "time");
        if (location){
            var u_time = prop.gl.getUniform(prop.program, location!);
            prop.gl.uniform1f(location, (u_time + prop.speed) % 10000);
        }

        prop.gl.drawArrays(
            prop.gl.TRIANGLES, 0, 6
        );
    }

    requestAnimationFrame(step)
}
requestAnimationFrame(step)

function setResizeUniform(name: string){
    let prop = needResizeGLs[name];
    let program = allGL[name];
    if (program){
        let canvas = allGL[name].gl.canvas as HTMLElement;

        let canvasAspectRatio = canvas!.clientWidth / canvas!.clientHeight
    
        let scale = 0;

        if (canvasAspectRatio < prop.aspectRatio){
            scale = canvasAspectRatio / prop.aspectRatio;
        }else{
            scale = prop.aspectRatio / canvasAspectRatio;
        }

        let scaleLocation = program.gl.getUniformLocation(program.program, 'scale');
        program.gl.uniform1f(scaleLocation, scale);

        let resolutionLocation = program.gl.getUniformLocation(program.program, 'resolution');
        program.gl.uniform2f(resolutionLocation, canvas!.clientWidth, canvas!.clientHeight);

    }
}


function setScrollUniform(name: string){
    let program = allGL[name];
    if (program){

        let resolutionLocation = program.gl.getUniformLocation(program.program, 'scroll');
        program.gl.uniform2f(resolutionLocation, mouseScroll.x, mouseScroll.y);

    }
}

window.onresize = (ev) =>{
    for(let key in needResizeGLs){
        setResizeUniform(key);
    }
}

window.onscroll = () =>{

    mouseScroll.x = window.scrollX;
    mouseScroll.y = window.scrollY;

    for(let key in needScrollGLs){
        setScrollUniform(key);
    }
}

window.onmousemove = (ev) =>{
    mousePos.x = ev.clientX;
    mousePos.y = ev.clientY;
}