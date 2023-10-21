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
      fed: true,
      played: true,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    setAnimals(prev => [...prev, { ...formData, dateOfAdmission: new Date(formData.dateOfAdmission),
        dateOfBirth: new Date(formData.dateOfBirth), fed: false, played: false, medicated: false}]);
    setIsModalOpen(false);
  };



  const handleCheckboxChange = (attribute: keyof Animal) => {
    // Update selectedAnimal state
    setSelectedAnimal(prev => prev ? { ...prev, [attribute]: !prev[attribute] } : null);
  
    // Update animals state
    setAnimals(prevAnimals => 
      prevAnimals.map(animal => 
        animal.id === selectedAnimal?.id ? { ...animal, [attribute]: !animal[attribute] } : animal
      )
    );
  };

  const filteredAnimals = animals.filter(animal => 
    animal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    animal.id.includes(searchQuery)
  );

  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    gender: 'Male' | 'Female';
    dateOfAdmission: string;
    dateOfBirth: string;
    type: string;
    breed: string;
    requiresMedication: boolean;
  }>({
    id: '',
    name: '',
    gender: 'Male', // default value
    dateOfAdmission: '',
    dateOfBirth: '',
    type: '',
    breed: '',
    requiresMedication: false,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'gender') {
      setFormData(prev => ({ ...prev, [name]: value as 'Male' | 'Female' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
};


  const handleDelete = (id: string) => {
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);
    setSelectedAnimal(null); 
};

  
  

  return (
    <Flex minH="100vh" direction="column" p={5} color="white" bgColor={"black"}>
      <Flex justify="space-between" alignItems="center" mb={5}>
        <Heading size="xl" color="orange">Pawfection</Heading>
      </Flex>
      
      <Input  placeholder="Search by animal name or ID" mb={5} borderColor="orange" focusBorderColor="orange.400"
      value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
    <Button colorScheme="orange" onClick={() => setIsModalOpen(true)} mb={5}>
        Add New Animal
    </Button>
      <Flex flex="1">
        <VStack flex="1" spacing={5} borderColor="orange" alignItems="start" maxH="calc(100vh - 200px)" overflowY="auto">
          {filteredAnimals.map(animal => (
            <Box key={animal.id} 
                p={3} 
                my={2} 
                w="80%"
                h="100px"
                border="1px solid orange"
                borderRadius="md"
                cursor="pointer"
                backgroundColor={
                    (animal.fed && animal.played && 
                     (animal.requiresMedication ? animal.medicated : true)) ? 
                    "green" : "red"
                  }
                color="white"
                onClick={() => setSelectedAnimal(animal)}>
                    <Text fontWeight="bold" mb={2}>{animal.name}</Text>
                    <Text>ID: {animal.id}</Text>
                    <Text>Type: {animal.type}</Text>
            </Box>
          ))}
          {/* You can add a button here to open a modal/form to add new animals */}
        </VStack>
        
        <Box flex="2" pl={3} borderLeft="1px solid orange">
          {selectedAnimal ? (
            <VStack alignItems="start" spacing={3}>
              <Text>Name: {selectedAnimal.name}</Text>
              <Text>Gender: {selectedAnimal.gender}</Text>
              <Text>Date of Admission: {selectedAnimal.dateOfAdmission.toLocaleDateString()}</Text>
              <Text>Date of Birth: {selectedAnimal.dateOfBirth.toLocaleDateString()}</Text>
              <Text>Type: {selectedAnimal.type}</Text>
              <Text>Breed: {selectedAnimal.breed}</Text>
              <Checkbox isChecked={selectedAnimal.fed} 
              onChange={() => handleCheckboxChange('fed')}>
                Fed
                </Checkbox>
                <Checkbox 
                isChecked={selectedAnimal.played} 
                onChange={() => handleCheckboxChange('played')}>
                Played
                </Checkbox>
                {selectedAnimal.requiresMedication && (
                <Checkbox 
                isChecked={selectedAnimal.medicated} 
                onChange={() => handleCheckboxChange('medicated')}>
                Medicated
                </Checkbox>
                )}
                <Button colorScheme="red" onClick={() => handleDelete(selectedAnimal.id)}>
                    Delete
                </Button>
            </VStack>
          ) : (
            <Text>Select an animal to view details</Text>
          )}
        </Box>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add New Animal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4} width="100%">
                        <Input 
                        name="id" 
                        placeholder="Animal ID"
                        value={formData.id}
                        onChange={handleInputChange}
                        />
                        <Input 
                        name="name" 
                        placeholder="Animal Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        />
                        <HStack spacing={4}>
                        <Text>Gender:</Text>
                        <RadioGroup 
                            name="gender"
                            defaultValue="Male"
                            value={formData.gender}
                            onChange={val => setFormData(prev => ({ ...prev, gender: val as 'Male' | 'Female' }))}
                        >
                            <HStack spacing={5}>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            </HStack>
                        </RadioGroup>
                        </HStack>
                        <Input 
                        name="dateOfAdmission" 
                        placeholder="Date of Admission (YYYY-MM-DD)"
                        value={formData.dateOfAdmission}
                        onChange={handleInputChange}
                        />
                        <Input 
                        name="dateOfBirth" 
                        placeholder="Date of Birth (YYYY-MM-DD)"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        />
                        <Input 
                        name="type" 
                        placeholder="Animal Type"
                        value={formData.type}
                        onChange={handleInputChange}
                        />
                        <Input 
                        name="breed" 
                        placeholder="Breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        />
                        <HStack spacing={4} width="100%">
                        <Text>Requires Medication:</Text>
                        <Switch 
                            name="requiresMedication"
                            isChecked={formData.requiresMedication}
                            onChange={e => setFormData(prev => ({ ...prev, requiresMedication: e.target.checked }))}
                        />
                        </HStack>
                    </VStack>
                    </ModalBody>
                <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                    Add
                </Button>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
}

