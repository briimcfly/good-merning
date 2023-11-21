import React from 'react';
import {SimpleGrid, Box, Text, Stack, Divider, Image, flexbox} from '@chakra-ui/react';
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from '../utils/date';
import StarRating from './Stars'; 
import ImageCarousel from './ImageCarousel';
import LabeledStarRating from './molecules/LabeledStarRating';
import RatingWrapper from './molecules/RatingWrapper';

const ReviewCard = ({review}) => {
    const formattedDate = formatDate(review.postedAt)
        // Check if images is an array and has length before mapping
    return (
        <>
        <Box p={5} shadow="md" borderWidth="1px" bg='white' borderRadius="lg" >
              {/* <ImageCarousel images={review.images || []} /> */}
                <Stack direction="row" mt={2} mb={2} alignItems='center'>
            
                <FaUserCircle size={45} color="teal" />
                <Box mt="4" mb="4">
                    <Text fontSize="xl" fontWeight="bold" mb="2">{review.user.username}</Text>
                    <Text mt={-3} color ="grey" >Reviewed: {formattedDate}</Text>
                </Box>

                <Box direction="row" w="100%"  >
                    <Stack ml={1} justifyContent="flex-end" direction="row">
                    {/* Images - Only show if there are images */}
                    {review.images && review.images.length > 0 && (
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} my={4}>
                           <> {review.images.map((image, index) => (
                                <Image key={index} src={image} alt={`Image ${index + 1}`} borderRadius="sm" boxSize="100px" objectFit='cover'/>
                            ))}</>
                        </SimpleGrid>
                    )}
                    </Stack>
                </Box>
                </Stack>
            <Divider mt={4}/>
            <Text mb={4} mt={4}>{review.comment}</Text>
            
            <Divider mb={4} />

            <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={8}>
                <RatingWrapper title ={'Landlord Score'}>
                    <LabeledStarRating 
                        label={'Professionalism'}
                        score={review.landLordScore.attitude}
                    />
                    <LabeledStarRating 
                        label={'Maintenance'}
                        score={review.landLordScore.maintenance}
                    />
                    <LabeledStarRating 
                        label={'Lease Management'}
                        score={review.landLordScore.leaseManagement}
                    />
                    <LabeledStarRating 
                        label={'Responsiveness'}
                        score={review.landLordScore.responsiveness}
                    />
                </RatingWrapper>
                <RatingWrapper title ={'Area Score'}>
                    <LabeledStarRating 
                        label={'Location'}
                        score={review.areaScore.location}
                    />
                    <LabeledStarRating 
                        label={'Neighborhood'}
                        score={review.areaScore.neighborhood}
                    />
                    <LabeledStarRating 
                        label={'Noise Level'}
                        score={review.areaScore.noiseLevel}
                    />
                </RatingWrapper>
                <RatingWrapper title ={'Financial Aspects'}>
                    <LabeledStarRating 
                        label={'Rent Fairness'}
                        score={review.financialAspects.rentFairness}
                    />
                    <LabeledStarRating 
                        label={'Rent Increases'}
                        score={review.financialAspects.rentIncreases}
                    />
                    <LabeledStarRating 
                        label={'Value'}
                        score={review.financialAspects.value}
                    />
                </RatingWrapper>
                <RatingWrapper title ={'Property Score'}>
                    <LabeledStarRating 
                        label={'Amenities'}
                        score={review.propertyScore.amenities}
                    />
                    <LabeledStarRating 
                        label={'Condition'}
                        score={review.propertyScore.condition}
                    />
                    <LabeledStarRating 
                        label={'Safety'}
                        score={review.propertyScore.safety}
                    />
                </RatingWrapper>
                </SimpleGrid>
                </Box>
        
        </>
    )
}

export default ReviewCard;
