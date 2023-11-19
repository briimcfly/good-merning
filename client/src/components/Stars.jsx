import {Box, Icon, Tooltip} from '@chakra-ui/react';
import {MdStar, MdStarBorder, MdStarHalf}  from 'react-icons/md';

const getStarIcon = (rating,index) => {
    if (rating >= index + 1) {
        //full star 
        return MdStar;
    } else if (rating >= index + 0.5) {
        //half star
        return MdStarHalf;
    } else {
        //empty star
        return MdStarBorder;
    }
}

const StarRating = ({rating})=> {
    return (
        <Box display="flex">
            {[...Array(5)].map((_, index) => (
                <Icon
                as={getStarIcon(rating,index)}
                key={index}
                color = {index < rating ? 'teal.500' : 'gray.300'}
                w={6}
                h={6}
                />
            ))}
        </Box>
    )
}

export default StarRating;