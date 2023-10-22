'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {motion} from 'framer-motion';

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
        <motion.img src={'/detective.png'} alt='detective' className="mb-6 self-center relative" variants={fadeIn} custom={0.4}></motion.img>
        <motion.h1 className="text-6xl mb-11 text-center" variants={fadeIn} custom={0.4}>
          What will you do?
        </motion.h1 >
        <motion.h3 className="text-center text-med" variants={fadeIn} custom={1.5}>
          Discover how your choices can affect evidence admissibility.
        </motion.h3>
    </motion.header>
    <motion.div className="mt-24" initial="hidden" animate="visible" variants={fadeIn} custom={3}>
      <Link href={"/quiz"}>
        <Button className="on">Take the quiz</Button>
      </Link>
    </motion.div>

  </div>
  )
}