import React, { useEffect } from 'react';
import { CanvasBlock } from './utils/glsl/CanvasBlock';
import { createFaintLightShader } from './utils/glsl/faintLightShader';

function App() {

  useEffect(() =>{
    createFaintLightShader('gl1', 0.005);
  }, [])

  return (
    <>
    <div className=' relative w-full h-screen flex flex-col justify-center items-center text-white'>

      <p className=' absolute pb-10 text-8xl opacity-40 font-thin text-outline-white-3'>高端人才通行證計劃</p>
      <p className=' text-8xl opacity-80 font-bold'>高端人才通行證計劃</p>

      <div className=' absolute w-full flex justify-evenly items-center bottom-0 bg-black pb-5 pt-5'>
        <p>張智芬</p>
        <p>朱樂怡</p>
        <p>胡朗霆</p>
        <p>陳培威</p>
      </div>
      <div className=' absolute w-full h-screen -z-50 bg-fixed'>
        <CanvasBlock id='gl1' canvasH={800} canvasW={800} />
      </div>
    </div>
    <div className=' w-full h-screen'>

    </div>
    </>
  );
}

export default App;
