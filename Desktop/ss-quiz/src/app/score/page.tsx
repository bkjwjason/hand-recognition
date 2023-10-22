'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const questions = [
  { text: 'Question 1: Is this the correct evidence?', answer: 'yes' },
  { text: 'Question 2: Did the suspect have a motive?', answer: 'no' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' },
  { text: 'Question 10: Was the evidence tampered with?', answer: 'yes' }
];

export default function ScorePage() {
    const searchParams = useSearchParams();
    const score = searchParams.get("score");

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-6">Your Score</h1>
      <p className="text-2xl mb-6">You scored: {score} out of {questions.length}</p>

      <h2 className="text-2xl mb-4">Correct Answers:</h2>
      <ul>
        {questions.map((q, index) => (
          <li key={index} className="mb-2">
            {q.text} - Answer: {q.answer}
          </li>
        ))}
      </ul>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
