import { inputRef, useEffect } from 'react';
import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {LOGIN_USER} from '../utils/mutations';
import Auth from '../utils/auth';
import { Input, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CityRentals from '../pages/CityRentals';
//import { ADD_LOCATION_REVIEW } from '../utils/mutations';
import { FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Stack } from "@chakra-ui/react"
import Login from './Login';
import Signup from './Signup';
import { useDisclosure } from "@chakra-ui/react"


const NewLocationReview = ({isOpen,onClose}) => {

    const handlePlaceSelect = () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
            // Extract city and state from the address components
            const cityComponent = place.address_components.find(component => component.types.includes('locality'));
            const stateComponent = place.address_components.find(component => component.types.includes('administrative_area_level_1'));
            const city = cityComponent ? cityComponent.long_name : '';
            const state = stateComponent ? stateComponent.short_name : '';

            if (city && state) {
                navigate(`/listings/${city}/${state}`);
            }
        } else {
            alert("No details available for input: '" + place.name + "'");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,[name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addLocationReview({
                variables: { ...formState },
            });
            Auth.login(data.addLocationReview.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            location: '',
            review: '',
            rating: '',
        });
    };
    const handleCancel = () => {
        onClose();
      };

    return (

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="left" borderBottomWidth="1px">
                    <Box fontSize="lg">Address</Box>
                    <ModalCloseButton
                        onClick={onClose}
                        variant="unstyled"
                        fontSize="lg"
                        position="absolute"
                        right="1rem"
                        top="0.5rem"
                    >
                        X
                    </ModalCloseButton>
                </ModalHeader>
                <Box textAlign="center" mt="4">
                    <Input ref={inputRef} placeholder="Enter address" />
                    <Button
                        mt="4"
                        colorScheme="blue"
                        onClick={handlePlaceSelect}
                    >
                        Search
                    </Button>
                </Box>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Rating</FormLabel>
                        <Input
                            placeholder="Please enter your rating"
                            name="rating"
                            type="submit"
                            onChange={handleChange} />
                    </FormControl>
                </ModalBody>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl>
                            <FormLabel>Review</FormLabel>
                            <Input
                                placeholder="Please enter your review"
                                name="review"
                                onChange={handleChange} />
                        </FormControl>
                        <Button
                            colorScheme="blue"
                            variant="solid"
                            w="100%"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={handleCancel}
                            variant="outline"
                            colorScheme="gray"
                            w="100%"
                            borderRadius="full"
                            borderColor="black"
                            borderWidth="2px"
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </ModalContent>
        </Modal>
    );
}   

export default NewLocationReview;
