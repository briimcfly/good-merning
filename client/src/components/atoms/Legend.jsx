import React from 'react';
import { Text } from '@chakra-ui/react';
import { ratingDescription } from '../../utils/ratingDescriptions';

const Legend = ({ category, subcategory, score }) => {

    // Check if the specific category and subcategory exist and have a description for the score
    if (!ratingDescription[category] || !ratingDescription[category][subcategory] || !ratingDescription[category][subcategory][score]) {
       return <Text>Description not found for {subcategory} with score {score}.</Text>;
    }

    // Access the description using the category and subcategory
    const description = ratingDescription[category][subcategory][score];
    return (
          <Text pt={1} fontSize="sm">{description}</Text>
    );
};

export default Legend;
