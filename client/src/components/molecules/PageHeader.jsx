import React, {useState} from 'react';
import {Flex, Stack, Button, Heading} from '@chakra-ui/react';
import { FaPlusSquare } from 'react-icons/fa';
import AuthService from '../../utils/auth';
import ReviewForm from '../ReviewForm';

//auth service 
const isLoggedIn = AuthService.loggedIn();

const PageHeader = ({city, state, address, titlePrefix}) => {
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const handleOpenReview = () => setIsReviewOpen(true);
    const handleCloseReview = () => setIsReviewOpen(false);

    const displayText = address ? address: `${city}, ${state}`;
    //Split Header Text into two parts 
    const titleFirstLine = titlePrefix || 'Listings in ';
    const titleSecondLine = displayText

    const authInfo = AuthService.loggedIn();
    console.log(authInfo);
    const loggedInUser = authInfo ? authInfo.username : null;
    console.log(loggedInUser);

    return (
        <Flex
        direction={{ base: 'column', md: 'row' }} 
        justifyContent="space-between"
        alignItems={{ base: 'start', md: 'center' }} 
        p={2}
        wrap="wrap"
         >
            <Stack mb={{ base: 4, md: 8 }} spacing="3">
                <Heading textColor ='gray.600' as="h3" size={{ base: 'xs', sm: 'sm', md: 'md' }}>
                    {titleFirstLine}
                </Heading>
                <Heading as="h2" size={{ base: 'md', sm: 'xl', md: '2xl' }}>
                    {titleSecondLine}
                </Heading>
            </Stack>
            {isLoggedIn && (
                <Button leftIcon={<FaPlusSquare/>}colorScheme="teal" onClick={handleOpenReview} mt={{ base: 4, md: 0 }} >
                    Add Review
                </Button>
            )}
            <ReviewForm isOpen={isReviewOpen} onClose={handleCloseReview} city={city} state={state} username={loggedInUser}/>
        </Flex>
    )
}

export default PageHeader;