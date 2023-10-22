'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  { text: 'Question 1: Is this the correct evidence?', answer: 'yes' },
  { text: 'Question 2: Did the suspect have a motive?', answer: 'no' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' }
];

export default function Page() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Array<'yes' | 'no'>>([]);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const createQueryString = (name:string , value:string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  };

  const handleAnswer = (answer: 'yes' | 'no') => {
    setAnswers((prev) => [...prev, answer]);

    // Update the score if the answer is correct
    if (answer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Handle quiz completion
      router.push("/score" + "?" + createQueryString("score", score.toString()));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-6">Quiz</h1>
      <div className="w-2/3 mb-6">
        <p className="text-xl">{questions[currentQuestion].text}</p>
      </div>
      <div>
        <button 
          className="mr-4 p-2 bg-blue-500 text-white rounded" 
          onClick={() => handleAnswer('yes')}>
          Yes
        </button>
        <button 
          className="p-2 bg-red-500 text-white rounded" 
          onClick={() => handleAnswer('no')}>
          No
        </button>
      </div>
    </div>
  );
}
