import React from 'react';
import {SimpleGrid, Box, Text, Stack} from '@chakra-ui/react';
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from '../utils/date';
import StarRating from './Stars'; 
import ImageCarousel from './ImageCarousel';

const ReviewCard = ({review}) => {
    const formattedDate = formatDate(review.postedAt)
        // Check if images is an array and has length before mapping
    return (
        <>
        <Box p={5} shadow="md" borderWidth="1px" bg='white' borderRadius="lg" >
            {/* <ImageCarousel images={review.images || []} /> */}
            <Stack direction="row" mt={2} mb={8}>
            <FaUserCircle size={30} />
            <Text fontSize="xl" fontWeight="bold">{review.user.username}</Text>
            </Stack>

            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}  >
                <div>
            <Text fontSize="md" fontWeight = 'bold'>Landlord Score</Text>
            <Stack direction="row" mt={2}>
                <Text fontSize="sm">Rent Fairness</Text>
                <StarRating rating={review.landLordScore.attitude} />
            </Stack>
            <Stack direction="row" mt={2}>
            <Text fontSize="sm">Lease Management</Text>
                <StarRating rating={review.landLordScore.leaseManagement} />
            </Stack>
            <Stack direction="row" mt={2}>
            <Text fontSize="sm">Maintenance</Text>
                <StarRating rating={review.landLordScore.maintenance} />
            </Stack>
            <Stack direction="row" mt={2}>
            <Text fontSize="sm">Responsiveness</Text>
                <StarRating rating={review.landLordScore.responsiveness} />
            </Stack>
            </div>
            <div>
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
            </div>
            <div>
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
            </div>
            <div>
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
                </Stack>
            </div>
            </SimpleGrid>
            <Text mt={8}>{review.comment}</Text>
            <Text mt={2} color ="grey">Posted on {formattedDate}</Text>
        </Box> 
        </>
    )
}

export default ReviewCard;
