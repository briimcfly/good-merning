import React from 'react';
import {Box, Text, Badge, Stack} from '@chakra-ui/react';
import { formatDate } from '../utils/date';
import { useNavigate } from 'react-router-dom';

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
            <Stack direction="row" mt={2}>
                <Badge borderRadius="full" px="2" colorScheme="teal">
                    {rental.averageRating.toFixed(1)} Stars
                </Badge>
                <Text mt={2}>{rental.reviews.length} Reviews</Text>
                <Text mt={2}>First review date: {lastReviewDate}</Text>
            </Stack>
            {/* Images and other listing details can go here */}
        </Box>
    );
}

export default RentalCard;