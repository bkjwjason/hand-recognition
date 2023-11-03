'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {useCollection} from "react-firebase-hooks/firestore";


const questions = [
  {text: 'A burglary has occurred at a house. Upon arriving at the scene, you interviewed the neighbors to gather any eyewitness accounts. One neighbor reports having seen a suspicious figure entering the victim\'s house on the day of the crime and offers to testify in court regarding his observation.  His statement as evidence is...' , answer: 'Admissible'},
  {text: 'The victim sustained severe injuries, including open fractures and lacerations, while chasing the burglar, who attacked them violently during the escape. The victim\'s family took graphic photographs of the injuries and submitted them to you for potential use as evidence in court. This evidence is...', answer: 'Inadmissible'},
  {text: 'After a comprehensive investigation, a man has emerged as the primary suspect in the burglary. A search of his criminal history reveals prior convictions for theft and burglary, which may be pertinent to the investigation. Naturally, his records tell you that he has a high likelihood of committing this crime. This evidence is...', answer: 'Inadmissible'},
  {text: 'A skilled cybersecurity specialist on your team hacked into the suspect\'s home computer. They discovered emails in which he discussed plans to commit a burglary, along with photos of items that match those reported stolen in the recent break-in. This evidence is...', answer: 'Inadmissible'},
  {text: 'After obtaining a search warrant, you searched the suspect\'s home and found a lockpick that may have been used in the burglary, supported by marks at the crime scene indicative of lockpicking. This evidence is...', answer: 'Admissible'},
  {text: 'Your team\'s cybersecurity specialist, acting on the search warrant, seized all potential digital evidence from the suspect\'s house, including hard drives. He secured them in a sealed plastic evidence bag and transported them to the lab. After legally decrypting and working on the original files, he uncovered evidence implicating the suspect in the crime. This evidence is...', answer: 'Inadmissible'},
  {text: 'To ascertain the role of the lockpick in the burglary, you enlisted the assistance of a locksmith. Although his expertise is not in forensic analysis, he provided an informed explanation of how the lockpick could have been used. He has agreed to serve as an expert witness if required. His statement as evidence is...', answer:'Inadmissible'},
];

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (custom = 0) => ({ opacity: 1, transition: { delay: custom } }),
  };

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<'Admissible' | 'Inadmissible'>>([]);
  const [majorityPercentage, setMajorityPercentage] = useState<number | null>(null);
  const [hasSelected, setHasSelected] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const createQueryString = (name:string , value:string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleAnswer = (answer: 'Admissible' | 'Inadmissible') => {
    const newAnswers = [...answers, answer]; // Collect the new set of answers
    setAnswers((prev) => [...prev, answer]);
    setHasSelected(true);
    if (answer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Handle quiz completion
      const queryString = createQueryString("score", score.toString()) + "&choices=" + encodeURIComponent(JSON.stringify(newAnswers));
      router.push("/score?" + queryString);
    }
  };


  return (
    <motion.div className="flex flex-col items-center" initial="hidden" animate="visible" key={currentQuestion}>
      <motion.div className=" mb-6 p-5 flex items-center justify-center" variants={fadeIn} custom={0.2} key={currentQuestion}>
        <Card className="xl:w-4/6 2xl:w-4/6">
          <CardHeader>
            <CardTitle>Question {currentQuestion + 1}</CardTitle>
            <CardDescription>Decide whether the following evidence is
              <span className="relative inline-block"> {/* Adding inline-block styling */}
              <HoverCard>
                <HoverCardTrigger>
                  <Button variant={"link"} className="text-black -mx-3 font-sans text-s underline">admissible</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex">
                    <div className="">
                      <h4 className="font-semibold">Admissible</h4>
                      <p className="text-sm">
                        Acceptable or valid, especially as evidence in a court of law.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </span> to prove the criminal guilty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.p className="text-xl text-justify">{questions[currentQuestion].text}</motion.p>
          </CardContent>
        </Card>
      </motion.div>
      <div>
        <motion.div variants={fadeIn} custom={3} key={currentQuestion}>
            <Button className="mr-6 text-lg" onClick={() => handleAnswer('Admissible')}>
                Admissible
            </Button>
            <Button className="text-lg"onClick={() => handleAnswer('Inadmissible')}>
                Inadmissible
            </Button>
        </motion.div>
      </div>
      {majorityPercentage !== null && (<Progress value={majorityPercentage} />)}
    </motion.div>
  );
}
