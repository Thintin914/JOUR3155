import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";



export function Quote(props: {screenWidth: number, mouseY: number, text: string, name: string, photo: string, fontSize: number}){

    const [isActive, setPhoto] = useState<boolean>(false);
    const [photoScope, photoAnimate] = useAnimate();
    async function photoFadeIn(){
      photoAnimate(photoScope.current, {boxShadow: '10px 50px 15px rgba(245, 217, 94, 0.8)'}, {duration: 2})
      await photoAnimate(photoScope.current, {opacity: 1, x: -20}, {ease: 'easeInOut', duration: 0.5});
    }
    async function photoFadeOut(){
      await photoAnimate(photoScope.current, {opacity: 0, x: 20, boxShadow: '0px 0px 0px rgba(245, 217, 94, 0)'}, {ease: 'easeInOut', duration: 0.5});
    }
    useEffect(() =>{
        console.log(photoScope)
        if (!photoScope.current)
          return;
        
        if (isActive){
          photoFadeIn()
        } else {
          photoFadeOut()
        }
      }, [isActive])

    return (
        <div className=' relative w-full h-fit mb-14 mt-5 '>

            <motion.div ref={photoScope} className=' fixed w-[150px] h-[150px] rounded-full right-[25px]'
                initial={{opacity: 0, x: 20}}
                style={{
                top: `${props.mouseY - 75}px`,
                }}>
                <img src={props.photo} className=' contain rounded-full' />
            </motion.div>

          <FaQuoteLeft className=' absolute left-0 top-0 animate-pulse'/>
          <FaQuoteRight className=' absolute right-0 bottom-0 animate-pulse'/>
          <p className=' text-center lg:pl-40 lg:pr-40 italic text-[#545454] font-semibold'
          style={{
            fontSize: `${props.fontSize}px`,
            lineHeight: '2.5rem'
          }}
          onMouseEnter={(e) =>{
            setPhoto(true);
          }}
          onMouseLeave={(e) =>{
            setPhoto(false);
          }}>
            {props.text}
          </p>
          <p className='absolute right-0 -bottom-14 text-[#545454] italic'>{props.name}</p>
        </div>
    )
}