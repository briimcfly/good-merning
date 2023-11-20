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

const StarRating = ({rating}) => {
    return (
        <Box display="flex">
            {[...Array(5)].map((_, index) => {
                // Determine the color based on the rating
                let color;
                if (rating <= 2) {
                    // If rating is 2 or less, color the stars red
                    color = index < rating ? 'red.300' : 'gray.300';
                } 
                else if (rating <= 3 && rating > 2){
                    color = index < rating ? 'yellow.400' : 'gray.300';
                }
                else {
                    // If rating is more than 2, color the stars with the original color
                    color = index < rating ? 'teal.500' : 'gray.300';
                }
                
                return (
                    <Icon
                        as={getStarIcon(rating, index)}
                        key={index}
                        color={color}
                        w={6}
                        h={6}
                    />
                );
            })}
        </Box>
    );
};


export default StarRating;