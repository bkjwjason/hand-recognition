'use client'

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const questions = [
  {text: 'A burglary has occurred at a house. Upon arriving at the scene, you interviewed the neighbors to gather any eyewitness accounts. One neighbor reports having seen a suspicious figure entering the victim\'s house on the day of the crime and offers to testify in court regarding his observation.  His statement as evidence is...', 
    answer: 'Admissible',
    explanation: 'In both the <a href="https://www.law.cornell.edu/rules/fre/rule_601" target="_blank" rel="noopener noreferrer">United States</a> and <a href="https://sso.agc.gov.sg/Act/EA1893?ProvIds=P13-#pr120-" target="_blank" rel="noopener noreferrer">Singapore</a>, every person is competent to be a witness unless rules provide otherwise. However, in both countries, the statement has to be provided by someone who witnessed the crime personally to be considered admissible.'
    + ' If the person\'s statement is based on hearing another person\'s statement, that would be considered <a href="https://www.law.cornell.edu/rules/fre/rule_801" target="_blank" rel="noopener noreferrer">hearsay</a> and inadmissible.' 
    + '\n\nFor example, if person A is called to court as a witness in a criminal trial, and he says, "I heard person B say that he saw person C commit the crime", this would be hearsay. This is because person A has no personal knowledge of what person B had witnessed, and his statements cannot be cross examined. Person A\'s statement is hearsay evidence and is inadmissible. Person B should be called to testify.',
    },
  {text: 'The victim sustained severe injuries, including open fractures and lacerations, while chasing the burglar, who attacked them violently during the escape. The victim\'s family took graphic photographs of the injuries and submitted them to you for potential use as evidence in court. This evidence is...', 
    answer: 'Inadmissible',
    explanation: 'In both the <a href="https://www.law.cornell.edu/rules/fre/rule_403" target="_blank" rel="noopener noreferrer">United States</a> and <a href="https://www.elitigation.sg/gdviewer/s/2011_SGCA_32#p1_117" target="_blank" rel="noopener noreferrer">Singapore</a>, the courts have the discretion to exclude admissible evidence in criminal proceedings where its probative value is outweighed by its prejudicial effect.'
    +'\n\nSimply put, this rule permits the exclusion of evidence if the evidence is more likely to unduly influence or evoke emotional responses in the court than it is to provide legitimate proof of an element of the crime.'
    +' Graphic images will certainly do so. While photos do show the injuries sustained, the overly graphic images can cause prejudice in convicting a suspect and hence it will be inadmissible. A better form of evidence would be a medical report.'},
  {text: 'After a comprehensive investigation, a man has emerged as the primary suspect in the burglary. A search of his criminal history reveals prior convictions for theft and burglary, which may be pertinent to the investigation. Naturally, his records tell you that he has a high likelihood of committing this crime. This evidence is...', 
    answer: 'Inadmissible',
    explanation: 'In both the <a href="https://www.law.cornell.edu/rules/fre/rule_404" target="_blank" rel="noopener noreferrer">United States</a> and <a href="https://sso.agc.gov.sg/Act/EA1893?ProvIds=P11-#pr54-" target="_blank" rel="noopener noreferrer">Singapore</a>, evidence of a person’s character or character trait is inadmissible to prove that on a particular occasion, the person acted in accordance with the character or trait.'
    + '\n\nOne interesting thing to note is that in Singapore, while the “bad” character of a person is deemed irrelevant, the accused having a “good” character is deemed <a href="https://sso.agc.gov.sg/Act/EA1893?ProvIds=P11-#pr55-" target="_blank" rel="noopener noreferrer">relevant</a> (such as having no prior criminal records).'
  },
  {text: 'A skilled cybersecurity specialist on your team hacked into the suspect\'s home computer. They discovered emails in which he discussed plans to commit a burglary, along with photos of items that match those reported stolen in the recent break-in. This evidence is...', 
    answer: 'Inadmissible',
    explanation: 'Hacking into a device without the owner’s permission is illegal. However, the admissibility of illegally obtained evidence differs in the United States and Singapore.'

    +'\n\nIn the <a href="https://www.law.cornell.edu/wex/fruit_of_the_poisonous_tree" target="_blank" rel="noopener noreferrer">United States</a>, evidence obtained illegally, such as through a violation of the Fourth Amendment (which covers illegal searches and seizures), is typically inadmissible. This is the exclusionary rule, also known as the "Fruit of the Poisonous Tree" which refers to evidence derived from something initially illegal.'
    
    +'\n\nIn Singapore, the Evidence Act does not exclude illegally obtained evidence. Previously, the <a href="https://journalsonline.academypublishing.org.sg/Journals/SAL-Practitioner/Crime/ctl/eFirstSALPDFJournalView/mid/593/ArticleId/1699/Citation/JournalsOnlinePDF" target="_blank" rel="noopener noreferrer">Supreme Court</a> had stated that evidence found relevant under the Evidence Act cannot be excluded even if it was improperly or illegally obtained unless reliability has been compromised. However, charges can be pressed for illegally obtaining the evidence, in this case through the <a href="https://sso.agc.gov.sg/Act/CMA1993" target="_blank" rel="noopener noreferrer">Computer Misuse Act</a>.'
    },
  {text: 'After obtaining a search warrant, you searched the suspect\'s home and found a lockpick that may have been used in the burglary, supported by marks at the crime scene indicative of lockpicking. This evidence is...', 
    answer: 'Admissible',
    explanation: 'Entering the house with a search warrant is a legal process, and this implies any evidence obtained is done legally. Next, the evidence must be relevant for it to be admissible in court.'

    + '\n\n**An evidence is relevant if:**'
    +'\n\n**(a) it has any tendency to make a fact more or less probable than it would be without the evidence; and**'
    +'\n\n**(b) the fact is of consequence in determining the action.**'
    
    +'\n\nIn the <a href="https://www.law.cornell.edu/wex/exclusionary_rule" target="_blank" rel="noopener noreferrer">United States</a>, the Fourth Amendment to the U.S. Constitution protects individuals from unreasonable searches and seizures. This means that, for evidence to be admissible, it must be obtained legally—typically through a valid search warrant. So, if a tool suspected of being used in a burglary is discovered during a legally executed search, and it is relevant to the case, it can be used as evidence.'
    
    +'\n\nIn contrast, Singapore\'s Evidence Act governs the admissibility of evidence. Here, the primary concern is <a href="https://sso.agc.gov.sg/Act/EA1893?ProvIds=P11-P4_5-#pr7-" target="_blank" rel="noopener noreferrer">relevance</a>. All relevant evidence is admissible, even if it was obtained illegally. This is further clarified in Question 4.'
    
    +'\n\nIn both the U.S. and Singapore, for evidence to be admissible in court, its relevance is paramount. To illustrate, if a tool is found in a burglary investigation and there\'s evidence suggesting its connection to the crime, such as matching tool marks, it\'s considered relevant in both jurisdictions.'
    },
  {text: 'Your team\'s cybersecurity specialist, acting on the search warrant, seized all potential digital evidence from the suspect\'s house, including hard drives. He secured them in a sealed plastic evidence bag and transported them to the lab. After legally decrypting and working on the original files, he uncovered evidence implicating the suspect in the crime. This evidence is...', 
    answer: 'Inadmissible',
    explanation: 'In both the United States and Singapore, any evidence that can be used in court to convict persons of crimes must be handled carefully to prevent tampering or contamination. To do so, the <a href="https://www.ncbi.nlm.nih.gov/books/NBK551677/" target="_blank" rel="noopener noreferrer">Chain of Custody</a> must be upheld, which is a process that governs the collection, sequence of control, transfer, and analysis of evidence. If any of the chains is broken, evidence is typically deemed  <a href="https://www.straitstimes.com/singapore/courts-crime/duo-escapes-gallows-after-split-apex-court-decision-on-chain-of-custody-of" target="_blank" rel="noopener noreferrer">inadmissible.</a>'

    +'\n\nThe idea behind the Chain of Custody is to establish that the alleged evidence is related to the alleged crime, rather than having been planted fraudulently to frame someone as guilty. In this situation, 2 actions broke the Chain of Custody. '
    
    +'\n\n**Collection**: Instead of a plastic evidence bag, the cybersecurity specialist should\'ve used a <a href="https://mosequipment.com/blogs/blog/faraday-bags-are-the-first-step-in-preserving-digital-evidence#:~:text=They%20protect%20the%20device%20from,criminal%20investigations%20or%20civil%20litigation." target="_blank" rel="noopener noreferrer">Faraday bag</a> to prevent possible tampering of the data from external signals.'
    +'\n\n**Analysis**: Rather than working and modifying the original file on the hard drive, a bit-for-bit <a href="https://resources.infosecinstitute.com/topics/digital-forensics/computer-forensics-chain-custody/#:~:text=What%20is%20the%20chain%20of,control%2C%20transfer%2C%20and%20analysis." target="_blank" rel="noopener noreferrer">clone</a> of the files should\'ve been created and worked on, since there is a possibility of “planting” evidence.'
    },
  {text: 'To ascertain the role of the lockpick in the burglary, you enlisted the assistance of a locksmith. Although his expertise is not in forensic analysis, he provided an informed explanation of how the lockpick could have been used. He has agreed to serve as an expert witness if required. His statement as evidence is...', 
    answer:'Inadmissible',
    explanation: 'In both countries, an expert can be called to provide testimony in court if the expert\'s specialized knowledge will help the trier of fact to understand the evidence or to determine a fact in issue. This is known as an <a href="https://www.law.cornell.edu/rules/fre/rule_702" target="_blank" rel="noopener noreferrer">expert witness</a>, and they are usually hired by a party.'

    +'\n\n**An <a href="https://sso.agc.gov.sg/Act/EA1893?ProvIds=P11-#pr47-" target="_blank" rel="noopener noreferrer">expert</a> is a person with such scientific, technical or other specialised knowledge based on training, study or experience.**'
    
    +'\n\nWhen selecting an expert, it is important to find someone with qualifications and experience related to the case\'s technical aspects. Having prior experience as an expert witness can be beneficial due to credibility. Furthermore, there should be a thorough examination of all of the expert\'s published works to ensure there is nothing in their professional history or list of publications that might undermine their credibility or challenge key technical aspects essential to the party\'s case narrative.'
    
    +'\n\nIn this case, while the locksmith has a specialty by profession, he is not a trained forensic locksmith. <a href="https://atslab.com/litigation-support/forensic-locksmith/#:~:text=Forensic%20locksmiths%20are%20certified%20specialists,in%20legal%20cases%20and%20investigations." target="_blank" rel="noopener noreferrer">Forensic locksmiths</a> are certified specialists capable of providing expert legal testimony on empirical scientific data relating to locks and keys. Therefore, the locksmith is not considered an expert, and his opinions will be inadmissible.'
    },
];

export default function ScorePage() {
    const searchParams = useSearchParams();
    const score = searchParams.get("score");
    const userChoices = JSON.parse(decodeURIComponent(searchParams.get("choices") || '[]')); // Parse the choices from the URL
      // A utility function to replace markdown-like bold with HTML strong tags
    const boldify = (text:String) => {
      return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    // Process paragraph to replace <a> tags with styled versions and ** with <strong>
    const processParagraph = (paragraph:String) => {
      // Convert **bold** into <strong> tags
      let processedParagraph = boldify(paragraph);
    
      // Convert links into styled <a> tags
      processedParagraph = processedParagraph.replace(
        /<a href="([^"]+)" target="_blank" rel="noopener noreferrer">([^<]+)<\/a>/g,
        (match, p1, p2) => `<a href="${p1}" target="_blank" rel="noopener noreferrer" style="color: #0563C1; text-decoration: underline;">${p2}</a>`
      );
    
      return processedParagraph;
    };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl mb-6">You scored {score} / 7! There were only 2 admissible evidence.</p>
      <h3 className="text-2xl mb-4">Here are some details:</h3>
      <Accordion type="single" collapsible className="w-full mb-4">
          {questions.map((question, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className='font-bold'>Question {index + 1}</AccordionTrigger>
                  <AccordionContent>
                      <blockquote className="border-l-4 border-gray-500 italic my-8 pl-4 py-4 mx-4">
                          <p className="text-lg font-medium text-justify ">{question.text}</p>
                      </blockquote>
                      <text className='text-base'>Your Choice: {userChoices[index]}</text> 
                      <br />
                      <text className='text-base'>Answer: {question.answer} </text>
                      <br />
                      <text className='text-base underline'>Explanation:</text> 
                      <div className='text-justify'>
                        {question.explanation.split('\n\n').map((paragraph, pIndex) => {
                          // Split the paragraph at each '**' to isolate bold text.
                          const processedParagraph = processParagraph(paragraph);
                          return (
                            <p key={pIndex} className="text-base mt-2" dangerouslySetInnerHTML={{ __html: processedParagraph }} />
                          );
                        })}
                      </div>
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
