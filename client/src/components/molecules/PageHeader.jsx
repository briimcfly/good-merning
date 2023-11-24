import { React, useState } from 'react';
import {Flex, Stack, Button, Heading, Box, useDisclosure} from '@chakra-ui/react';
import { FaPlusSquare } from 'react-icons/fa';
import Auth from '../../utils/auth';
import handleClick from '../NewLocationReview';
import NewLocationReview from '../NewLocationReview';


const PageHeader = ({city, state, address, titlePrefix}) => {
    const displayText = address ? address: `${city}, ${state}`;
    //Split Header Text into two parts 
    const titleFirstLine = titlePrefix || 'Listings in ';
    const titleSecondLine = displayText

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isNewLocationReviewOpen, setIsNewLocationReviewOpen] =
			useState(false);
        

    	// const handleClick = () => {
        //    onOpen();
		// 		console.log("Button clicked");
		// };

    return (
			<Flex
				direction={{ base: "column", md: "row" }}
				justifyContent="space-between"
				alignItems={{ base: "start", md: "center" }}
				p={2}
				wrap="wrap"
			>
				<Stack mb={{ base: 4, md: 8 }} spacing="3">
					<Heading
						textColor="gray.600"
						as="h3"
						size={{ base: "xs", sm: "sm", md: "md" }}
					>
						{titleFirstLine}
					</Heading>
					<Heading as="h2" size={{ base: "md", sm: "xl", md: "2xl" }}>
						{titleSecondLine}
					</Heading>
				</Stack>
                {Auth.loggedIn() && (
                    <Box alignItems="right">
                        <Button        
                            //onClick={onOpen}
                            onClick={handleClick}
                            leftIcon={<FaPlusSquare />}
                            colorScheme="teal"
                        >
                            Add Review
                        </Button>
                    </Box>
                )}

			</Flex>
		);
}


export default PageHeader;import React from 'react';
import {Flex, Heading, Button} from '@chakra-ui/react';
import { FaPlusSquare } from 'react-icons/fa';

const PageHeader = ({city, state, address, titlePrefix}) => {
    const displayText = address ? address: `${city}, ${state}`;
    const title = titlePrefix ? 
    `${titlePrefix} \n ${displayText}` :
    `Listings in \n ${displayText}`;

    return (
        <Flex justifyContent='space-between' p={2}>
            <Heading as='h1' mb={8}>
                {title} 
            </Heading>
            <Button leftIcon={<FaPlusSquare/>}colorScheme="teal" to="/add-review" mt={1}>
                Add Review
            </Button>
        </Flex>
    )
}

export default PageHeader;