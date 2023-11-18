import React from 'react';
import {SimpleGrid, Box, Text, Stack, Divider} from '@chakra-ui/react';
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
            <Stack ml={1} direction ="column">
            <Text fontSize="xl" fontWeight="bold">{review.user.username}</Text>
            <Text mt={-3}color ="grey">Reviewed: {formattedDate}</Text>
            </Stack>
            </Stack>
            <Divider mt={4}/>
            <Text mb={4} mt={4}>{review.comment}</Text>
            <Divider mb={4} />

            <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={8}>
                <RatingWrapper title ={'Landlord Score'}>
                    <LabeledStarRating 
                        label={'Rent Fairness'}
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
                        label={'Maintenance'}
                        score={review.propertyScore.condition}
                    />
                    <LabeledStarRating 
                        label={'Lease Management'}
                        score={review.propertyScore.safety}
                    />
                </RatingWrapper>
                </SimpleGrid>


{/*             
                <Text fontSize="md" fontWeight = 'bold'>Area Score</Text>
                <Stack direction="row" mt={2}>
                    <Text fontSize="sm">Location</Text>
                    <StarRating rating={review.areaScore.location} />
                </Stack>
                <Stack direction="row" mt={2}>
                <Text fontSize="sm">Neighborhood</Text>
                    <StarRating rating={review.areaScore.neighborhood} />
                </Stack>
                <Stack direction="row" mt={2}>
                <Text fontSize="sm">Noise Level</Text>
                    <StarRating rating={review.areaScore.noiseLevel} />
                </Stack>
      
                <Text fontSize="md" fontWeight = 'bold'>Property Score</Text>
                <Stack direction="row" mt={2}>
                    <Text fontSize="sm">Amenities</Text>
                    <StarRating rating={review.propertyScore.amenities} />
                </Stack>
                <Stack direction="row" mt={2}>
                <Text fontSize="sm">Condition</Text>
                    <StarRating rating={review.propertyScore.condition} />
                </Stack>
                <Stack direction="row" mt={2}>
                <Text fontSize="sm">Safety</Text>
                    <StarRating rating={review.propertyScore.safety} />
                </Stack>

                <Text fontSize="md" fontWeight = 'bold'>Financial Aspects</Text>
                <Stack direction="row" mt={2}>
                    <Text fontSize="sm">Rent Fairness</Text>
                    <StarRating rating={review.financialAspects.rentFairness} />
                </Stack>
                <Stack direction="row" mt={2}>
                <Text fontSize="sm">Rent Increases</Text>
                    <StarRating rating={review.financialAspects.rentIncreases} />
                </Stack>
                <Stack direction="row" mt={2}>
                <Text fontSize="sm">Value</Text>
                    <StarRating rating={review.financialAspects.value} />
                </Stack> */}
                </Box>
        
        </>
    )
}

export default ReviewCard;
