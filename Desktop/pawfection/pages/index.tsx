import { Box, Flex, Heading, Input, VStack, Button, Text, HStack, Checkbox, Modal, ModalBody, ModalOverlay,
ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Radio, RadioGroup, Switch } from "@chakra-ui/react";
import { useState } from 'react';
import { Animal } from '../src/models/animal';

const sampleAnimals: Animal[] = [
    {
      id: '2222',
      name: 'Milo',
      gender: 'Male',
      dateOfAdmission: new Date('2022-01-15'),
      dateOfBirth: new Date('2020-05-20'),
      type: 'Dog',
      breed: 'Golden Retriever',
      fed: false,
      played: false,
      medicated: false,
      requiresMedication: false
    },
    {
      id: '1111',
      name: 'Whiskers',
      gender: 'Female',
      dateOfAdmission: new Date('2021-08-10'),
      dateOfBirth: new Date('2019-03-13'),
      type: 'Cat',
      breed: 'Siamese',
      fed: true,
      played: false,
      medicated: false,
      requiresMedication: true
    },
    {
        id: '3333',
        name: 'Tofu',
        gender: 'Female',
        dateOfAdmission: new Date('2023-08-10'),
        dateOfBirth: new Date('2023-08-01'),
        type: 'Cat',
        breed: 'Tofu',
        fed: true,
        played: false,
        medicated: false,
        requiresMedication: false
      },
      {
        id: '4444',
        name: 'Dawg',
        gender: 'Male',
        dateOfAdmission: new Date('2000-12-09'),
        dateOfBirth: new Date('2000-12-09'),
        type: 'Dog',
        breed: 'Poodle',
        fed: true,
        played: false,
        medicated: false,
        requiresMedication: true
      },
      {
        id: '5555',
        name: 'Bear',
        gender: 'Male',
        dateOfAdmission: new Date('2000-12-09'),
        dateOfBirth: new Date('2000-12-01'),
        type: 'Dog',
        breed: 'German Shepherd',
        fed: true,
        played: false,
        medicated: false,
        requiresMedication: true
      },
      {
        id: '6666',
        name: 'Doge',
        gender: 'Male',
        dateOfAdmission: new Date('2000-12-09'),
        dateOfBirth: new Date('2000-11-01'),
        type: 'Dog',
        breed: 'Shiba Inu',
        fed: true,
        played: false,
        medicated: false,
        requiresMedication: true
      },
      {
        id: '8888',
        name: 'Milo',
        gender: 'Male',
        dateOfAdmission: new Date('2022-01-15'),
        dateOfBirth: new Date('2020-03-20'),
        type: 'Dog',
        breed: 'Terrier',
        fed: false,
        played: false,
        medicated: false,
        requiresMedication: false
      },
  ];

  

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>(sampleAnimals);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null); 
  const [command, setCommand] = useState("");
  const [outputMessage, setOutputMessage] = useState<string | null>(null);

  const getMedicationVideoID = (type: string) => {
    switch (type) {
        case 'Dog':
            return 'Y3yHgItqGmo';
        case 'Cat':
            return 'Y3meUkY2e4Y';
        default:
            return 'sSMQiUnCtZI';
    }
};

  const handleDelete = (id: string) => {
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);
    setSelectedAnimal(null); 
};

const handleCommand = () => {
  const parts = command.split(" ");
  if (command.startsWith("add")) {
      const newAnimal: Animal = {
          id: '9999',
          name: 'Sausage',
          gender: 'Male',
          dateOfAdmission: new Date('2022-11-11'),
          dateOfBirth: new Date('2022-11-11'),
          type: 'Dog',
          breed: 'German Shepherd',
          fed: false,
          played: false,
          medicated: false,
          requiresMedication: true,
      };
      setAnimals(prev => [...prev, newAnimal]);
      setCommand("");  // Clear the command input
      setOutputMessage("Successfully added!"); 
  } else if (command.startsWith("mark")) {
      const parts = command.split(" ");
      if (parts.length >= 3) {
        const index = parseInt(parts[1]);
        const attributes = parts.slice(2).join(" ").split(",").map(attr => attr.trim());
        updateAnimalAttributes(index, attributes, true);
        setCommand("");  // Clear the command input
        setOutputMessage("Succesfully marked!")
      }
    } else if (command.startsWith("unmark")) {
      const parts = command.split(" ");
      if (parts.length >= 3) {
        const index = parseInt(parts[1]);
        const attributes = parts.slice(2).join(" ").split(",").map(attr => attr.trim());
        updateAnimalAttributes(index, attributes, false);
        setCommand("");  // Clear the command input
        setOutputMessage("Succesfully unmarked!")
      }
    } else if (command.startsWith("delete")) {
      if(parts.length === 2) {
        const index = parseInt(parts[1]);
        if(index >= 1 && index <= animals.length) {
          handleDelete(animals[index - 1].id);
          setCommand("");  // Clear the command input
          setOutputMessage(`Animal at index ${index} deleted!`);
        } else {
          setOutputMessage("Invalid index for delete!");
        }
      } else {
        setOutputMessage("Invalid delete command format. It should be: delete [index]");
      }
    } else {
      setOutputMessage("Invalid command!");
    }
  };

  const updateAnimalAttributes = (index: number, attributes: string[], value: boolean) => {
    if (index >= 1 && index <= animals.length) {
      let updatedAnimal = {...animals[index - 1]};
      attributes.forEach(attr => {
        switch (attr) {
          case "fed":
            updatedAnimal.fed = value;
            break;
          case "played":
            updatedAnimal.played = value;
            break;
          case "medicated":
            updatedAnimal.medicated = value;
            break;
          default:
            // Handle unknown attributes or do nothing
            break;
        }
      });
      const updatedAnimals = [...animals];
      updatedAnimals[index - 1] = updatedAnimal;
      setAnimals(updatedAnimals);
  
      // Check if the selected animal is the one being updated
      if (selectedAnimal?.id === updatedAnimal.id) {
        setSelectedAnimal(updatedAnimal);
      }
  
      setOutputMessage(value ? `Attributes updated for ${updatedAnimal.name}!` : `Attributes reset for ${updatedAnimal.name}!`);
    } else {
      setOutputMessage("Invalid index!");
    }
  };
  return (
    <Flex minH="100vh" direction="column" p={5} color="white" bgColor="#A8D8EA">
      <Flex justify="space-between" alignItems="center" mb={5}>
        <Heading size="xl" color="#FFFFD2">Pawfection</Heading>
      </Flex>
      
      <Input placeholder="Input Command" mb={5} color="black" borderColor="#FFFFD2" borderWidth={2}
      value={command} onChange={(e) => setCommand(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCommand()}/>
      {outputMessage && <Text color="black" fontWeight="bold">{outputMessage}</Text>}
      <Flex flex="1">
        <VStack flex="1" spacing={5} alignItems="start" maxH="calc(100vh - 200px)" overflowY="auto">
          {animals.map((animal, index) => (
            <Box key={animal.id} 
                p={3} 
                my={2} 
                w= "80%"
                minH={["150px", "100px"]}
                border="1px solid #FFFFD2"
                borderRadius="md"
                cursor="pointer"
                fontWeight={"bold"}
                backgroundColor={
                    (animal.fed && animal.played && 
                     (animal.requiresMedication ? animal.medicated : true)) ? 
                    "#30E3CA" : "#AA96DA"
                  }
                  color="black"
                onClick={() => setSelectedAnimal(animal)}>
                    <Text fontWeight="bold" mb={2}>{index + 1}. {animal.name}</Text>
                    <Text>ID: {animal.id}</Text>
                    <Text>Type: {animal.type}</Text>
            </Box>
          ))}
          {/* You can add a button here to open a modal/form to add new animals */}
        </VStack>
        
        <Box flex="2" pl={3} borderLeft="3px solid #FFFFD2" color="black"fontWeight={"bold"}>
          {selectedAnimal ? (
            <VStack alignItems="start" spacing={3}>
              <Text>Name: {selectedAnimal.name}</Text>
              <Text>Gender: {selectedAnimal.gender}</Text>
              <Text>Date of Admission: {selectedAnimal.dateOfAdmission.toLocaleDateString()}</Text>
              <Text>Date of Birth: {selectedAnimal.dateOfBirth.toLocaleDateString()}</Text>
              <Text>Type: {selectedAnimal.type}</Text>
              <Text>Breed: {selectedAnimal.breed}</Text>
              <Text color={selectedAnimal.fed ? "green" : "red"}>Fed: {selectedAnimal.fed ? "Yes" : "No"}</Text>
              <Text color={selectedAnimal.played ? "green" : "red"}>Played: {selectedAnimal.played ? "Yes" : "No"}</Text>
              {selectedAnimal.requiresMedication && (
                <>
                      <Text as="span" color={selectedAnimal.medicated ? "green.500" : "red.500"}>
                          Medicated: {selectedAnimal.medicated ? "Yes" : "No"}
                      </Text>
                    <Box my={3}>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${getMedicationVideoID(selectedAnimal.type)}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </Box>
                </>
          )}
          </VStack>
          ) : (
            <Text>Select an animal to view details</Text>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

