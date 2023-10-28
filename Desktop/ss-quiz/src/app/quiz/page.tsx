'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {motion} from "framer-motion";
import { Button } from '@/components/ui/button';


const questions = [
  {text: 'A burglary has occurred at a house. You arrived at the scene and interviewed the neighbors about what they might have witnessed. One of them mentions that he witnessed a suspicious figure entering the victim’s house on the day of the crime. He offers to testify as a witness in court to provide evidence. With the witness testimony, you decide to…' , answer: 'Keep the evidence'},
  {text: 'The victim was severely injured in the process of chasing after the burglar. The burglar violently attacked the victim in the midst of escaping, and this resulted in open fractures and lacerations on the victim’s body. The victim’s families took multiple graphic photos of the injuries and provided them to you, hoping they could be used as evidence in court. With these photos, you decide to…', answer: 'Discard the evidence'},
  {text: 'After thorough investigations, a man has been narrowed down as the suspect in the burglary. Upon searching his criminal record, you find out that he was previously convicted of multiple thefts and burglaries. Naturally, his records tell you that he has a high likelihood of committing this crime. With this newfound record, you decide to…', answer: 'Discard the evidence'},
  {text: 'A skilled cybersecurity specialist in your team managed to hack into his home computer. Emails of him talking to his friend about his plans to break into a house, and photos of items that match the stolen items from the burglary were found. With these digital evidence, you decide to…', answer: 'Discard the evidence'},
  {text: 'You have been issued a search warrant from the court to search the suspect\'s home. Upon searching his house, you found a lockpick that has been possibly used to aid the suspect in the burglary. Furthermore, there were marks at the scene of the burglary that suggested the use of a lockpick. You decide to….', answer: 'Keep the evidence'},
  {text: 'Your team\'s cybersecurity specialist also searched the suspect\'s house and obtained all possible sources of digital evidence such as hard drives. He places it in a sealed plastic evidence bag and brings it to his lab to work on the files on the hard drive. After decrypting and working with the original files, he finds evidence that strongly suggests the suspect committed the crime. You decide to…', answer: 'Discard the evidence'},
  {text: 'Lastly, to determine how the lockpick was used in the burglary, you called for the help of a locksmith. While his specialty did not lie in forensics, he tried his best to explain how the lockpick might have been used in the burglary. He offers to be appointed to act as an expert witness. You decide to..', answer:'Discard the evidence'},
];

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (custom = 0) => ({ opacity: 1, transition: { delay: custom } }),
  };

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<'Keep the evidence' | 'Discard the evidence'>>([]);
  const [hasSelected, setHasSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [keptEvidence, setKeptEvidence] = useState(0);
  const router = useRouter();

  const createQueryString = (name:string , value:string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleAnswer = (answer: 'Keep the evidence' | 'Discard the evidence') => {
    const newAnswers = [...answers, answer]; // Collect the new set of answers
    setAnswers((prev) => [...prev, answer]);
    setHasSelected(true);
    if (answer === 'Keep the evidence') {
      setKeptEvidence((prevKept) => prevKept + 1);
    }

    if (answer === questions[currentQuestion].answer && questions[currentQuestion].answer == 'Keep the evidence') {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Handle quiz completion
      const queryString = createQueryString("score", score.toString()) + "&" + createQueryString("kept", keptEvidence.toString()) + "&choices=" + encodeURIComponent(JSON.stringify(newAnswers));
      router.push("/score?" + queryString);
    }
  };


  return (
    <motion.div className="flex flex-col items-center" initial="hidden" animate="visible" key={currentQuestion}>
      <motion.div className=" mb-6 p-5" variants={fadeIn} custom={0} key={currentQuestion}>
        <motion.p className="text-xl">{questions[currentQuestion].text}</motion.p>
      </motion.div>
      <div>
        <motion.div variants={fadeIn} custom={0} key={currentQuestion}>
            <Button className="mr-6 text-lg" onClick={() => handleAnswer('Keep the evidence')}>
                Keep the evidence
            </Button>
            <Button className="text-lg"onClick={() => handleAnswer('Discard the evidence')}>
                Discard the evidence
            </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
