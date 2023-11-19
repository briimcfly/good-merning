import StarRating from '../Stars';
import {Text} from '@chakra-ui/react';

const LabeledStarRating = ({label, score}) => {
    return(
        <> 

            <Text fontSize="sm" fontWeight="bold" >{label}</Text>
            <StarRating rating={score} />   

        </>
    )
}

export default LabeledStarRating;