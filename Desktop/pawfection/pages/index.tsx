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
      requiresMedication: true
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
  ];

  

export default function Home() {
  const [animals, setAnimals] = useState<Animal[]>(sampleAnimals);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null); 
  const [command, setCommand] = useState("");
  const [outputMessage, setOutputMessage] = useState<string | null>(null);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>(sampleAnimals);


  const getMedicationVideoID = (type: Animal) => {
    if (type.id === '2222') {
      return '1TB-M6Le-IU'
    } else if (type.type === 'Dog') {
      return 'Y3yHgItqGmo'
    } else if (type.type === 'Cat') {
      return 'Y3meUkY2e4Y'
    } else {
      return 'sSMQiUnCtZI'
    }
};

  const handleDelete = (id: string) => {
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);
    setSelectedAnimal(null); 
};

const handleCommand = () => {
  let parts = command.split(" /by ");
  const user = parts[1] || ""; // This is safe because if /by doesn't exist, it'll be undefined.
  parts = parts[0].split(" ");  
  const action = parts[0];
  const index = parseInt(parts[1]);
  const attributes = parts.slice(2).join(" ").split(",").map(attr => attr.trim());
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
        if (index && attributes.length) {
          updateAnimalAttributes(index, attributes, true, user);
          setCommand("");  // Clear the command input
          setOutputMessage("Successfully marked!");
      }
    } else if (command.startsWith("unmark")) {
          if (index && attributes.length) {
            updateAnimalAttributes(index, attributes, false, user);
            setCommand("");  // Clear the command input
            setOutputMessage("Successfully unmarked!");
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
    } else if (command.startsWith("search")) {
      const nameToSearch = parts[1];
      const foundAnimals = animals.filter(animal => animal.name.toLowerCase().includes(nameToSearch.toLowerCase()));
      
      if (foundAnimals.length) {
        setFilteredAnimals(foundAnimals);
        setSelectedAnimal(foundAnimals[0]);  // Optional: Select the first matched animal.
        setOutputMessage(`Found ${foundAnimals.length} match(es)!`);
      } else {
        setOutputMessage("No animal found with that name.");
        setFilteredAnimals([]);  // No matches, so clear the list.
      }
    } else if (command === "list") {
      setFilteredAnimals(animals);
      setOutputMessage("Showing all animals.");
    } else {
      setOutputMessage("Invalid command!");
    }
  };

  const updateAnimalAttributes = (index: number, attributes: string[], value: boolean, user:string) => {
    if (index >= 1 && index <= animals.length) {
      let updatedAnimal = {...animals[index - 1]};
      console.log("Current animal object:", updatedAnimal);

      attributes.forEach(attr => {
        switch (attr) {
          case "fed":
            updatedAnimal.fed = value;
            if (value) updatedAnimal.fedBy = user;
            else delete updatedAnimal.fedBy;
            break;
          case "played":
            updatedAnimal.played = value;
            if (value) updatedAnimal.playedBy = user;
            else delete updatedAnimal.playedBy;
            break;
          case "medicated":
            console.log("Updating medicated to", value);
            updatedAnimal.medicated = value;
            if (value) updatedAnimal.medicatedBy = user;
            else delete updatedAnimal.medicatedBy;
            break;
          default:
            // Handle unknown attributes or do nothing
            break;
        }
      });
      console.log("Updated animal object:", updatedAnimal);
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
          {filteredAnimals.map((animal, index) => (
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
              {selectedAnimal?.id === '2222' && (
                <Text>Injury: <br />1. Pimple looking ulcer at bottom lip. Monitor for growth every session. <br /> 
                2. Right hand paw red. Rinse at bath area with medicated shampoo, wait 5 minutes and towel dry.</Text>
              )}
              {selectedAnimal?.id === '1111' && (
                <Text>Injury: <br />1. Neck rashes. Check if it is red or raw on the skin, feed liquid medication as instructed on bottle.<br /></Text>
              )}

              <Text color={selectedAnimal.fed ? "green" : "red"}>Fed: {selectedAnimal.fed ? `Yes ${selectedAnimal.fedBy ? '(by ' + selectedAnimal.fedBy + ')' : ''}` : "No"}</Text>
              <Text color={selectedAnimal.played ? "green" : "red"}>Played: {selectedAnimal.played ? `Yes ${selectedAnimal.playedBy ? '(by ' + selectedAnimal.playedBy + ')' : ''}` : "No"}</Text>
              {selectedAnimal.requiresMedication && (
                <>
                      <Text as="span" color={selectedAnimal.medicated ? "green.500" : "red.500"}>
                          Medicated: {selectedAnimal.medicated ? `Yes ${selectedAnimal.medicatedBy ? '(by ' + selectedAnimal.medicatedBy + ')' : ''}` : "No"}
                      </Text>
                    <Box my={3}>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${getMedicationVideoID(selectedAnimal)}`}
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

