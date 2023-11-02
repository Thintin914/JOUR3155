export function CanvasBlock(props: {id: string, canvasH: number, canvasW: number, customClassName?: string}){
    return (
      <div className=" w-full h-full">
        {
          props.customClassName ? 
          <canvas id={props.id} width={props.canvasW} height={props.canvasH} className={props.customClassName}/> :
          <canvas id={props.id} width={props.canvasW} height={props.canvasH} className=" w-full h-full"/>
        }
      </div>
    )
  }