import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    RadioGroup,
    Radio,
    Stack,
    Text,
    TextArea
} from '@chakra-ui/react';
import CitySearch from './CitySearch';
import { ratingDescription } from '../utils/ratingDescriptions';

//Radio Group Component 
const RatingRadioGroup =({category, categoryName}) => {
    const description = ratingDescription[categoryName];

    return (
        <RadioGroup name={categoryName}>
            <Stack>
                {Object.entries(description).map(([value, label]) => {
                    <Radio value={value} key={value}>
                        <Text>{value}: {label}</Text>
                    </Radio>
                })}
            </Stack>
        </RadioGroup>
    )
}

const ReviewForm = () => {
    //Form State
    const[formState, setFormState] = useState({
        address: '',
        city: '',
        state: '',
        comment: '',
        landLordScore: {},
        propertyScore: {},
        areaScore: {},
        financialAspects: {},
        images: [],
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCategoryChange = (categoryName, value) => {
        setFormState(prevState => ({
            ...prevState,
            [categoryName]: {
                ...prevstate[categoryName],
                ...value
            }
        }))
    }
    
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add a New Review
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant='ghost'>Submit Review</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
