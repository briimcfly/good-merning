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
    Textarea,
    Input,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react';
import AddressSearch from './AddressSearch';
import { ratingDescription } from '../utils/ratingDescriptions';
import StarRating from './Stars';
import { displayNames } from '../utils/displayNames.jsx';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations';

//Radio Group Component for handling different Ratings.. 
const RatingRadioGroup =({category, categoryName, handleCategoryChange}) => {
    const description = ratingDescription[category];
    const displayName = displayNames[category]?.displayName || 'Unknown Category';
    const subCategoryNames = displayNames[category]?.items

    //Just in case we have a missing description
    if (!description) {
    console.error(`No description found for category: ${categoryName}`);
    return <Text>Error: Description not found for {categoryName}</Text>;
    }
    return (
        <FormControl as='fieldset' isRequired>
            <AccordionItem>
                <AccordionButton>
                    <FormLabel fontSize='lg' fontWeight='bold' as='legend'>{displayName}</FormLabel>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
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
                </AccordionPanel>
            </AccordionItem>
        </FormControl>
      );
}

//The full review form component ... 
const ReviewForm = ({isOpen, onClose, city, state, username}) => {
    //State for selected images 
    const [selectedImages, setSelectedImages] = useState([]);

    //Handle the image selection
    const handleImageSelect = (event) => {
        const files = event.target.files;
        const selected = Array.from(files).slice(0, 3); // Limit to a maximum of 3 images
        setSelectedImages(selected);
    };

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

    //Handle Input Changes 
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(formState)

        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    //Handle Category Changes (Ratings)
    const handleCategoryChange = (categoryName, subCategoryName, value) => {
        setFormState(prevState => ({
            ...prevState,
            [categoryName]: {
                ...prevState[categoryName],
                [subCategoryName]: parseInt(value, 10)
            }
        }));
    };

    //Handle address selection from the AddressSearch component
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

    //Apollo Mutation for adding reviews 
    const [addReview] = useMutation(ADD_REVIEW, {
        onCompleted: () => {
            window.location.reload();
        },
        onError: (error) => {
            console.error('Uh Oh, Coudnt add review', error);
        }
    });
      
    //Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            const uploadedImageUrls = [];

            if(selectedImages.length > 0) {
                const formData = new FormData();
                selectedImages.forEach(image=> {
                    formData.append('image',image);
                })
    
                const imageUploadResponse = await fetch('http://localhost:3001/upload-image', { // Adjust the URL if necessary
                    method: 'POST',
                    body: formData,
                });
    
                const uploadResults = await imageUploadResponse.json();
    
                if(!imageUploadResponse.ok) {
                    throw new Error(uploadResults.message || "Error uploading photos")
                }
    
                console.log(uploadResults);
    
                uploadedImageUrls.push(uploadResults.imageUrl);
            }

        const variables = {
            city: formState.city,
            state: formState.state,
            address: formState.address,
            images: uploadedImageUrls,
            propertyScore: formState.propertyScore,
            landLordScore: formState.landLordScore,
            areaScore: formState.areaScore,
            financialAspects: formState.financialAspects,
            comment: formState.comment,
            username,
            rating: formState.rating
        }

        
            await addReview({variables}); 
    } 
         catch (error) {
            console.error('Submission error', error);

        }
    }

    

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl">
          <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px)' />
          <ModalContent as="form" onSubmit={handleSubmit}>
            <ModalHeader>Add a New Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

                {/* Address */}
              <FormControl isRequired mb={8}>
                <FormLabel htmlFor="address">Address</FormLabel>
                <AddressSearch 
                city={city}
                state={state}
                onAddressSelect={handleAddressSelect}
                />
              </FormControl>

            <Accordion defaultIndex={[0]}>
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
            </Accordion>
              {/* Images */}
            <FormControl>
                <FormLabel htmlFor="images">Add Photos (up to 3)</FormLabel>
                <Input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                />
            </FormControl>


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
                <Stack direction="row" gap={4}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" colorScheme="teal">Submit Review</Button>
                </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      );
}

export default ReviewForm;
