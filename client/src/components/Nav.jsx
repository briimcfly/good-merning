import React from 'react';
import { useState } from 'react';
import { ArrowRightIcon, ArrowUpIcon } from '@chakra-ui/icons';
import {  Flex, Button, Heading, Spacer, HStack, Box, Input, Stack } from "@chakra-ui/react"
import {Link} from 'react-router-dom';
import Auth from '../utils/auth';
import Login from './Login';
import Signup from './Signup';
import CitySearchNav from './CitySearchNav';

const Nav = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  //Test this line
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleLogin = () => {
    isLoggedIn()
    // If login is successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };
  const handleOpenSignup = () => setIsSignupOpen(true); 
  const handleCloseSignup = () => setIsSignupOpen(false);

  const handleSignup = () => {
    isLoggedIn()
    // If signup is successful, set isLoggedIn to true
    setIsLoggedIn(true);
    // If signup is successful, close the signup modal
    handleCloseSignup();
  };

  return (
		//if Not Logged In
		<Flex
			as="nav"
			width="100vw"
			height="64px"
			top="20px"
			left="20px"
			justify="space-between"
			pt={10}
			pb={10}
			pl={6}
			pr={6}
			alignItems="center"
		>
			<Box gap="32px">
				{/* Dwellex Logo */}
				<Stack direction="row" spacing={4}>
					<Link to="/" style={{ textDecoration: "none" }}>
						<Heading as="h1" fontWeight="700" size="xl" lineHeight="28px">
							Dwellex
						</Heading>
					</Link>
					<Box>
						<CitySearchNav />
					</Box>
				</Stack>
			</Box>
			<Spacer />
			<HStack>
				{Auth.loggedIn() ? (
					<>
						<Button
							onClick={() => Auth.logout()}
							colorScheme="blue"
							variant="solid"
							type="submit"
							padding="0px, 12px, 0px, 12px"
							gap="8px"
						>
							Logout
						</Button>
					</>
				) : (
					<>
						<Button
							border="1px"
							leftIcon={<ArrowRightIcon />}
							variant="outline"
							color="blue.500"
							onClick={handleOpenLogin}
						>
							Login
						</Button>
						<Button
							leftIcon={<ArrowUpIcon />}
							colorScheme="blue"
							variant="solid"
							type="submit"
							padding="0px, 12px, 0px, 12px"
							gap="8px"
							onClick={handleOpenSignup}
						>
							Sign Up
						</Button>
					</>
				)}
			</HStack>
			<Login
				isOpen={isLoginOpen}
				onClose={handleCloseLogin}
				onLogin={handleLogin}
			/>
			{isSignupOpen && (
				<Signup
					isOpen={isSignupOpen}
					onClose={handleCloseSignup}
					onSignup={handleSignup}
				/>
			)}
		</Flex>
	);
};

export default Nav;