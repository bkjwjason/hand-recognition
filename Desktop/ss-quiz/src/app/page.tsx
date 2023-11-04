'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {motion} from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({ opacity: 1, transition: { delay: custom } }),
};
export default function Home() {
  return (
  <div className="flex flex-col items-center justify-center h-full">
    <motion.header
    initial="hidden"
    animate="visible"
    className="flex flex-col">
        <motion.img src={'/detective.png'} alt='detective' className="mb-6 self-center relative" variants={fadeIn} custom={0.2}></motion.img>
        <motion.h1 className="text-6xl mb-11 text-center" variants={fadeIn} custom={0.2}>
          Which evidence will stand?
        </motion.h1 >
        <motion.h3 className="text-center text-med" variants={fadeIn} custom={0.6}>
          Explore what constitutes
          <span className="relative inline-block"> {/* Adding inline-block styling */}
            <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={'link'} className="text-black -mx-3 font-sans text-s underline">admissible</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex">
                        <div className="">
                          <h4 className="font-semibold">Admissible</h4>
                          <p className="text-sm">
                            Acceptable or valid, especially as evidence in a court of law.
                          </p>
                        </div>
                      </div>
                  </PopoverContent>
                </Popover>
          </span>
          evidence in court under US and Singapore law.
        </motion.h3>
    </motion.header>
    <motion.div className="mt-24" initial="hidden" animate="visible" variants={fadeIn} custom={2}>
      <Link href={"/quiz"}>
        <Button className="on">Take the quiz</Button>
      </Link>
    </motion.div>

  </div>
  )
}