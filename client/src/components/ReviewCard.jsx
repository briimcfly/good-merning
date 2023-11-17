import React from 'react';
import {Box, Text, Stack} from '@chakra-ui/react';
import { FaUserCircle } from "react-icons/fa";
import { formatDate } from '../utils/date';
import StarRating from './Stars'; 

const ReviewCard = ({review}) => {
    const formattedDate = formatDate(review.postedAt)
    return (
        <Box p={5} shadow="md" borderWidth="1px">
            <Stack direction="row" mt={2}>
            <FaUserCircle size={30} />
            <Text fontSize="xl" fontWeight="bold">{review.user.username}</Text>
            </Stack>
            <Stack direction="row" mt={2}>
                <StarRating rating={review.rating} />
            </Stack>
            <Text mt={2}>{review.comment}</Text>
            <Text mt={2} color ="grey">Posted on {formattedDate}</Text>
        </Box> 
    )
}

export default ReviewCard;
