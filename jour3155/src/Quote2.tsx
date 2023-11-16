import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";



export function Quote2(props: {mouseY: number, text: string, photo: string, fontSize: number}){

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
        <div className=' relative w-full h-fit '>

            <motion.div ref={photoScope} className=' fixed w-[150px] h-[150px] rounded-full right-[25px]'
                initial={{opacity: 0, x: 20}}
                style={{
                top: `${props.mouseY - 75}px`,
                }}>
                <img src={props.photo} className=' contain rounded-full' />
            </motion.div>

          <p className=' italic text-[#606060]'
          style={{
            fontSize: `${props.fontSize}px`,
            lineHeight: '1.8rem'
          }}
          onMouseEnter={(e) =>{
            setPhoto(true);
          }}
          onMouseLeave={(e) =>{
            setPhoto(false);
          }}>
            {props.text}
          </p>
        </div>
    )
}