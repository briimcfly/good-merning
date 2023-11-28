import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    Button,
    RadioGroup,
    Radio,
    Stack,
    Text,
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react';
import AddressSearch from './AddressSearch';
import { ratingDescription } from '../utils/ratingDescriptions';
import StarRating from './Stars';
import { displayNames } from '../utils/DisplayNames';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations';


//Radio Group Component 
const RatingRadioGroup =({category, categoryName, handleCategoryChange}) => {
    const description = ratingDescription[category];
    const displayName = displayNames[category]?.displayName || 'Unknown Category';
    const subCategoryNames = displayNames[category]?.items

    if (!description) {
    console.error(`No description found for category: ${categoryName}`);
    return <Text>Error: Description not found for {categoryName}</Text>;
    }
    return (
        <FormControl as='fieldset' isRequired>
            <FormLabel fontSize='lg' fontWeight='bold' as='legend'>{displayName}</FormLabel>
            {Object.entries(description).map(([subCategory, values]) => {
                const subCategoryDisplayName = subCategoryNames[subCategory] || subCategory;

                return (
                    <RadioGroup key={subCategory} onChange={(value) => handleCategoryChange(category, subCategory, value)} mb={8}>
                        <Text fontSize="lg" mb={2}>{subCategoryDisplayName}</Text>
                        <Stack spacing={8}>
                            {Object.entries(values).map(([score, desc]) => (
                                <Radio value={score} key={`${subCategory}-${score}`} name={subCategory}>
                                    <Stack direction='row' alignItems='center'>
                                        <StarRating rating={score}/>
                                        <Text fontSize='sm'>{`${desc}`}</Text>
                                    </Stack>
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                );
            })}
        </FormControl>
      );
}

const ReviewForm = ({isOpen, onClose, city, state, username}) => {
    //Form State
    const[formState, setFormState] = useState({
        address: '',
        city: '',
        state: '',
        comment: '',
        landLordScore: {
            responsiveness: 0,
            attitude: 0,
            maintenance:0,
            leaseManagement:0
        },
        propertyScore: {
            condition:0,
            amenities:0,  
            safety:0,
        },
        areaScore: {
            location:0,
            noiseLevel:0,
            neighborhood:0,
        },
        financialAspects: {
            rentFairness:0,
            rentIncreases:0,
            value:0,
        },
        images: [],
        rating:5
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(formState)

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleCategoryChange = (categoryName, subCategoryName, value) => {
        setFormState(prevState => ({
            ...prevState,
            [categoryName]: {
                ...prevState[categoryName],
                [subCategoryName]: parseInt(value, 10)
            }
        }));
    };

    const handleAddressSelect = (addressComponents) => {
        const address = {
            address: '',
            city: '',
            state: '',
        };
    
        addressComponents.forEach(component => {
            const types = component.types;
            if (types.includes('street_number')) {
                address.address += component.long_name + ' ';
            } else if (types.includes('route')) {
                address.address += component.long_name;
            } else if (types.includes('locality')) {
                address.city = component.long_name;
            } else if (types.includes('administrative_area_level_1')) {
                address.state = component.short_name;
            }
        });
    
        setFormState(prevState => ({
            ...prevState,
            ...address
        }));
    };

    const [addReview] = useMutation(ADD_REVIEW, {
        onCompleted: () => {
            window.location.reload();
        },
        onError: (error) => {
            console.error('Uh Oh, Coudnt add review', error);
        }
    });
      

    const handleSubmit = async (event) => {
        event.preventDefault();
        const variables = {
            city: formState.city,
            state: formState.state,
            address: formState.address,
            images: formState.images,
            propertyScore: formState.propertyScore,
            landLordScore: formState.landLordScore,
            areaScore: formState.areaScore,
            financialAspects: formState.financialAspects,
            comment: formState.comment,
            username,
            rating: formState.rating
        }

        try {
            await addReview({variables});  
        } catch (error) {

        }
    }

    

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>Add a New Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

                {/* Address */}
              <FormControl isRequired>
                <FormLabel htmlFor="address">Address</FormLabel>
                <AddressSearch 
                city={city}
                state={state}
                onAddressSelect={handleAddressSelect}
                />
              </FormControl>

              {/* Landlord Score */}
              <RatingRadioGroup
                name="landLordScore"
                category="landLordScore"
                categoryName="Landlord Score"
                handleCategoryChange={handleCategoryChange}
              />

              {/* Property Score */}
              <RatingRadioGroup
                name="propertyScore"
                category="propertyScore"
                categoryName="Property Score"
                handleCategoryChange={handleCategoryChange}
              />

              {/* Area Score */}
              <RatingRadioGroup
                name="areaScore"
                category="areaScore"
                categoryName="Area Score"
                handleCategoryChange={handleCategoryChange}
              />

              {/* Financial Aspects */}
              <RatingRadioGroup
                name="financialAspects"
                category="financialAspects"
                categoryName="Financial Aspects"
                handleCategoryChange={handleCategoryChange}
              />

              {/* Comment */}
              <FormControl isRequired>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <Textarea
                  name="comment"
                  value={formState.comment}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" >Submit Review</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
}

export default ReviewForm;
