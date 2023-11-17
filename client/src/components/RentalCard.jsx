import React from 'react';
import {Box, Text, Flex, Stack} from '@chakra-ui/react';
import { formatDate } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import StarRating from './Stars';

const RentalCard = ({rental}) => {
    const lastReviewDate = formatDate(rental.reviews[0].postedAt);

    const navigate = useNavigate();

    const handleCardClick = () => {
        const encodedAddress = encodeURIComponent(rental.address);
        navigate(`/rentals/${encodedAddress}`)
    }

    return (
        <Box p={5} shadow="md" borderWidth="1px" onClick = {handleCardClick}>
            <Text fontSize="xl" fontWeight="bold">{rental.address}</Text>
            <Stack direction="row" mt={2} align="center">
            <StarRating rating={rental.averageRating.toFixed(1)} />
            <Text color="grey" fontSize="sm">Last Update: {lastReviewDate}</Text>
            </Stack>
            <Flex direction="row" justifyContent = "space-between">
                <Text mt={2}>{rental.reviews.length} Reviews</Text>
                
            </Flex>
            {/* Images and other listing details can go here */}
        </Box>
    );
}

export default RentalCard;