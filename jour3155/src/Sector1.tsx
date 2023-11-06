import { motion } from "framer-motion";



export function Sector1(props: {width: number, height: number, top: number, scrollY: number, title: string, contents: string[]}){

    return (
        <div className=' relative w-full flex justify-center items-center font-sans'
            style={{
                height: `${ props.height}vh`,
                top: `${props.top}px`
            }}>
        
            <motion.div className=' absolute bg-[#f5d95e] h-full flex-col justify-start items-start text-5xl gap-5'
            initial={{width: 0, skewY: 0}}
            viewport={{ once: true }}
            whileInView={{width: props.width, skewY: 5}}
            transition={{duration: 1, ease: "easeOut"}}
            >
                <p className=" font-bold text-6xl relative -top-5 md:pl-16 pl-8 overflow-clip w-fit h-fit">
                    {props.title}
                </p>
                <div className=" w-fit h-full flex justify-start items-start md:pl-28 pl-16 md:text-5xl text-2xl gap-5 overflow-clip relative"
                    style={{
                        left: `${props.scrollY / 5}px`
                    }}>
                {
                    props.contents.map((item, index) =>{
                        return (
                            <p key={`sector-${index}`}>
                                {item}
                            </p>
                        )
                    })
                }
                </div>
            </motion.div>

      </div>
    )
}