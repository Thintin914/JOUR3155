import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";



export function Quote(props: {screenWidth: number, mouseY: number, text: string, name: string, photo: string, fontSize: number, title?: string}){

    const [isActive, setPhoto] = useState<boolean>(false);
    const [photoScope, photoAnimate] = useAnimate();
    async function photoFadeIn(){
      photoAnimate(photoScope.current, {boxShadow: '10px 60px 10px rgba(238, 243, 243, 0.8)'}, {duration: 2})
      await photoAnimate(photoScope.current, {opacity: 1, x: -20}, {ease: 'easeInOut', duration: 0.5});
    }
    async function photoFadeOut(){
      await photoAnimate(photoScope.current, {opacity: 0, x: 20, boxShadow: '0px 0px 0px rgba(238, 243, 243, 0)'}, {ease: 'easeInOut', duration: 0.5});
    }
    useEffect(() =>{
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

          <div className="bg-fixed w-full h-full bg-cover absolute opacity-30 -z-50"
            style={{
              backgroundImage: 'url(./images/newspaper.jpeg)'
            }}
          />

          <motion.div ref={photoScope} className=' fixed w-[150px] h-[150px] rounded-full right-[25px]'
              initial={{opacity: 0, x: 20}}
              style={{
              top: `${props.mouseY - 75}px`,
              }}>
            <div className="fixed bottom-[-120px] text-white text-3xl italic">
              <p>{props.title ? props.title : ''}</p>
            </div>
              <img src={props.photo} className=' contain rounded-full' />
              <img src={props.photo} className=' absolute -z-40 -bottom-[200px] opacity-40 -right-8 grayscale contain rounded-full shadow-lg shadow-gray-400' />
          </motion.div>

          <FaQuoteLeft className=' absolute left-0 top-0 animate-pulse'/>
          <FaQuoteRight className=' absolute right-0 bottom-0 animate-pulse'/>
          <motion.p className=' text-center lg:pl-40 lg:pr-40 italic text-[#545454] font-semibold'
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 1.5}}
          viewport={{once: true}}
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
          </motion.p>
          <p className='absolute right-0 -bottom-14 text-[#545454] italic'>{props.name}</p>
        </div>
    )
}