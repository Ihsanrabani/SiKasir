import '../index.css'
import {  easeInOut,
          motion,
          useDragControls,
          useMotionValue,
          useAnimate,
          spring
} from 'motion/react'

function BottomSheet({open, setOpen, children}) {
  const controls = useDragControls();
  const y = useMotionValue(0)
  const [scope, animate] = useAnimate();

  const closeSheet = async () => {
    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await Promise.all([
      animate("#sheet", {
        y: [yStart, 800]
      }),
      animate(scope.current, {
        opacity: [1, 0]
      })
    ])

    setOpen(false);
  }

  return (
    <>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          onClick={closeSheet}
          ref={scope}
          className='fixed inset-0 z-50 bg-black/50 backdrop-blur-xl'
        >
          <motion.div
            id="sheet" 
            onClick={(e) => {e.stopPropagation()}}
            initial={{ y: "100%"}} 
            animate={{ y: "0%"}}
            style={{ y }}
            transition={{
              duration: 0.5,
              type: spring,
              damping: 17 
            }}
            onDragEnd={() => {
              if (y.get() >= 40) {
                closeSheet()
              }
            }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
            className='absolute bg-white py-3 bottom-0 w-full flex flex-col items-center px-4 h-[80vh]'
          >
            <div className='absolute inset-x-0 z-10 flex justify-center p-4 '>
              <button 
                className='h-2 w-14 cursor-grab touch-none rounded-full bg-black/20 active:cursor-grabbing'
                onPointerDown={(e) => {
                  controls.start(e)
                }}
              ></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default BottomSheet
