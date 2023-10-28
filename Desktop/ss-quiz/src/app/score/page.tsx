'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const questions = [
  {text: 'A burglary has occurred at a house. You arrived at the scene and interviewed the neighbors about what they might have witnessed. One of them mentions that he witnessed a suspicious figure entering the victim’s house on the day of the crime. He offers to testify as a witness in court to provide evidence. With the witness testimony, you decide to…' , 
    answer: 'Keep the evidence',
    explanation: 'In both the United States and Singapore, every person is competent to be a witness unless rules provide otherwise. However, in both countries, the statement has to be provided by someone who witnessed the crime personally to be considered admissible.'
    + ' If the person\'s statement is based on hearing another person\'s statement, that would be considered hearsay and inadmissible.' 
    + '\n\nFor example, if person A is called to court as a witness in a criminal trial, and he says, "I heard person B say that he saw person C commit the crime", this would be hearsay. This is because person A has no personal knowledge of what person B had witnessed, and his statements cannot be cross examined. Person A\'s statement is hearsay evidence and is inadmissible. Person B should be called to testify.',
    },
  {text: 'The victim was severely injured in the process of chasing after the burglar. The burglar violently attacked the victim in the midst of escaping, and this resulted in open fractures and lacerations on the victim’s body. The victim’s families took multiple graphic photos of the injuries and provided them to you, hoping they could be used as evidence in court. With these photos, you decide to…', 
    answer: 'Discard the evidence',
    explanation: 'Witness testimonies are generally admissible in court if they directly observed the event.' 
    +' In both the United States and Singapore, the courts have the discretion to exclude admissible evidence in criminal proceedings where its probative value is outweighed by its prejudicial effect (Muhammad bin Kadar v Public Prosecutor).'
    +'\n\nSimply put, this rule permits the exclusion of evidence if the evidence is more likely to unduly influence or evoke emotional responses in the court than it is to provide legitimate proof of an element of the crime.'
    +' Graphic images will certainly do so. While photos do show the injuries sustained, the overly graphic images can cause prejudice in convicting a suspect and hence it will be inadmissible. A better form of evidence would be a medical report.'},
  {text: 'After thorough investigations, a man has been narrowed down as the suspect in the burglary. Upon searching his criminal record, you find out that he was previously convicted of multiple thefts and burglaries. Naturally, his records tell you that he has a high likelihood of committing this crime. With this newfound record, you decide to…', 
    answer: 'Discard the evidence',
    explanation: 'In both the United States and Singapore, evidence of a person’s character or character trait is inadmissible to prove that on a particular occasion, the person acted in accordance with the character or trait.'
    + '\n\nOne interesting thing to note is that in Singapore, while the “bad” character of a person is deemed irrelevant, the accused having a “good” character is deemed relevant (such as having no prior criminal records).'
  },
  {text: 'A skilled cybersecurity specialist in your team managed to hack into his home computer. Emails of him talking to his friend about his plans to break into a house, and photos of items that match the stolen items from the burglary were found. With these digital evidence, you decide to…', 
    answer: 'Discard the evidence',
    explanation: 'Hacking into a device without the owner’s permission is illegal. However, the admissibility of illegally obtained evidence differs in the United States and Singapore.'

    +'\n\nIn the United States, evidence obtained illegally, such as through a violation of the Fourth Amendment (which covers illegal searches and seizures), is typically inadmissible. This is the exclusionary rule, also known as the "Fruit of the Poisonous Tree" which refers to evidence derived from something initially illegal.'
    
    +'\n\nIn Singapore, the Evidence Act does not exclude illegally obtained evidence. Previously, the Supreme Court had stated that evidence found relevant under the Evidence Act cannot be excluded even if it was improperly or illegally obtained unless reliability has been compromised. (“Phyllis Tan”) However, charges can be pressed for illegally obtaining the evidence, in this case through the Computer Misuse Act.'
    },
  {text: 'You have been issued a search warrant from the court to search the suspect’s home. Upon searching his house, you found a lockpick that has been possibly used to aid the suspect in the burglary. Furthermore, there were marks at the scene of the burglary that suggested the use of a lockpick. You decide to….', 
    answer: 'Keep the evidence',
    explanation: 'Entering the house with a search warrant is a legal process, and this implies any evidence obtained is done legally. Next, the evidence must be relevant for it to be admissible in court.'

    + '\n\n**An evidence is relevant if:**'
    +'\n\n**(a) it has any tendency to make a fact more or less probable than it would be without the evidence; and**'
    +'\n\n**(b) the fact is of consequence in determining the action.**'
    
    +'\n\nIn the United States, the Fourth Amendment to the U.S. Constitution protects individuals from unreasonable searches and seizures. This means that, for evidence to be admissible, it must be obtained legally—typically through a valid search warrant. So, if a tool suspected of being used in a burglary is discovered during a legally executed search, and it is relevant to the case, it can be used as evidence.'
    
    +'\n\nIn contrast, Singapore\'s Evidence Act governs the admissibility of evidence. Here, the primary concern is relevance. All relevant evidence is admissible, even if it was obtained illegally. This is further clarified in Question 4.'
    
    +'\n\nIn both the U.S. and Singapore, for evidence to be admissible in court, its relevance is paramount. To illustrate, if a tool is found in a burglary investigation and there\'s evidence suggesting its connection to the crime, such as matching tool marks, it\'s considered relevant in both jurisdictions.'
    },
  {text: 'Your team\'s cybersecurity specialist also searched the suspect\'s house and obtained all possible sources of digital evidence such as hard drives. He places it in a sealed plastic evidence bag and brings it to his lab to work on the files on the hard drive. After decrypting and working with the original files, he finds evidence that strongly suggests the suspect committed the crime. You decide to…', 
    answer: 'Discard the evidence',
    explanation: 'In both the United States and Singapore, any evidence that can be used in court to convict persons of crimes must be handled carefully to prevent tampering or contamination. To do so, the Chain of Custody must be upheld, which is a process that governs the collection, sequence of control, transfer, and analysis of evidence. If any of the chains is broken, evidence is typically deemed inadmissible.'

    +'\n\nThe idea behind the Chain of Custody is to establish that the alleged evidence is related to the alleged crime, rather than having been planted fraudulently to frame someone as guilty. In this situation, 2 actions broke the Chain of Custody. '
    
    +'\n\n**Collection**: Instead of a plastic evidence bag, the cybersecurity specialist should\'ve used a Faraday bag to prevent possible tampering of the data from external signals.'
    +'\n\n**Analysis**: Rather than working and modifying the original file on the hard drive, a bit-for-bit clone of the files should\'ve been created and worked on, since there is a possibility of “planting” evidence.'
    },
  {text: 'Lastly, to determine how the lockpick was used in the burglary, you called for the help of a locksmith. While his specialty did not lie in forensics, he tried his best to explain how the lockpick might have been used in the burglary. He offers to be appointed to act as an expert witness. You decide to..', 
    answer:'Discard the evidence',
    explanation: 'In both countries, an expert can be called to provide testimony in court if the expert’s specialized knowledge will help the trier of fact to understand the evidence or to determine a fact in issue. This is known as an expert witness, and they are usually hired by a party.'

    +'\n\n**An expert is a person with such scientific, technical or other specialised knowledge based on training, study or experience.**'
    
    +'\n\nWhen selecting an expert, it is important to find someone with qualifications and experience related to the case\'s technical aspects. Having prior experience as an expert witness can be beneficial due to credibility. Furthermore, there should be a thorough examination of all of the expert\'s published works to ensure there is nothing in their professional history or list of publications that might undermine their credibility or challenge key technical aspects essential to the party\'s case narrative.'
    
    +'\n\nIn this case, while the locksmith has a specialty by profession, he is not a trained forensic locksmith. Forensic locksmiths are certified specialists capable of providing expert legal testimony on empirical scientific data relating to locks and keys. Therefore, the locksmith is not considered an expert, and his opinions will be inadmissible.'
    },
];

export default function ScorePage() {
    const searchParams = useSearchParams();
    const score = searchParams.get("score");
    const kept = searchParams.get("kept");
    const userChoices = JSON.parse(decodeURIComponent(searchParams.get("choices") || '[]')); // Parse the choices from the URL

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl mb-6">Out of the {kept} evidences you decided to keep, {score} of them are admissible.</p>
      <h3 className="text-2xl mb-4">Here are some details:</h3>
      <Accordion type="single" collapsible className="w-full mb-4">
          {questions.map((question, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className='font-bold'>Question {index + 1}</AccordionTrigger>
                  <AccordionContent>
                      <blockquote className="border-l-4 border-gray-500 italic my-8 pl-4 py-4 mx-4">
                          <p className="text-lg font-medium">{question.text}</p>
                      </blockquote>
                      <text className='text-base'>Your Choice: {userChoices[index]}</text> 
                      <br />
                      <text className='text-base'>Answer: {question.answer} </text>
                      <br />
                      <text className='text-base underline'>Explanation:</text> 
                      {question.explanation.split('\n\n').map((paragraph, pIndex) => (
                                  <p key={pIndex} className='text-base mt-2'>
                                  {paragraph.split('**').map((part, sIndex) => 
                                      sIndex % 2 === 0 ? part : <strong key={sIndex}>{part}</strong>
                                  )}
                              </p>
                      ))}
                  </AccordionContent>
              </AccordionItem>
          ))}
      </Accordion>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
