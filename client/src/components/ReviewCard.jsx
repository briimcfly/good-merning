import React from 'react';
import {Box, Text, Badge, Stack} from '@chakra-ui/react';
import { formatDate } from '../utils/date';
import StarRating from './Stars'; 

const ReviewCard = ({review}) => {
    const formattedDate = formatDate(review.postedAt)
    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Text fontSize="xl" fontWeight="bold">{review.address}</Text>
            <Stack direction="row" mt={2}>
                <StarRating rating={review.rating} />
            </Stack>
            <Text mt={2}>{review.comment}</Text>
            <Text mt={2}>Posted by: {review.user.username} on {formattedDate}</Text>
        </Box> 
    )
}

export default ReviewCard;
