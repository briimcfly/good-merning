
// import React from "react"
// import { Link } from "react-router-dom"
// import { Box, Flex, Text, Button, Input } from "@chakra-ui/react"


// import { CloseIcon, MenuIcon, SearchIcon, ArrowRightIcon, ArrowUpIcon,SmallCloseIcon } from ".../Icons"

// const NavbarItems = (props) => {
//   const { children, isLast, to = "/", ...rest } = props
//   return (
//     <Text
//       mb={{ base: isLast ? 0 : 8, sm: 0 }}
//       mr={{ base: 0, sm: isLast ? 0 : 8 }}
//       display="block"
//       {...rest}
//     >
//       <Link to={to}>{children}</Link>
//     </Text>
//   )
// }

// const NavHeader = (props) => {
//   const [show, setShow] = React.useState(false)
//   const toggleMenu = () => setShow(!show)

//   return (
    
//     //if logged OUT
//     <Flex
//       as="nav"
//       align="center"
//       justify="space-between"
//       wrap="wrap"
//       w="100%"
//       mb={8}
//       p={8}
//       bg={["primary.500", "primary.500", "transparent", "transparent"]}
//       color={["white", "white", "primary.700", "primary.700"]}
//       {...props}>

//       <Flex align="center">
//             <Text align="left" w="100px" color="black">
//                 Dwellex
//             </Text>
//             <Input placeholder='Select a new city' size='small' />
//             <Button colorScheme='gray'rightIcon={< SearchIcon />}>find</Button>
//       </Flex>

//       <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
//         {show ? <CloseIcon /> : <MenuIcon />}
//       </Box>

//       <Box
//         display={{ base: show ? "block" : "none", md: "block" }}
//         flexBasis={{ base: "100%", md: "auto" }}>

//         <Flex
//           align={["center", "center", "center", "center"]}
//           justify={["center", "space-between", "flex-end", "flex-end"]}
//           direction={["column", "row", "row", "row"]}
//           pt={[4, 4, 0, 0]}>

//             <Button to="/pricing" colorScheme="blue" variant='outline'size="sm"
//                 rounded="md" leftIcon={< ArrowRightIcon />}>Login 
//             </Button>
          
//             <Button
//                 size="sm"
//                 rounded="md"
//                 color={["primary.500", "primary.500", "blue", "blue"]}
//                 bg={["white", "white", "primary.500", "primary.500"]}
//                 leftIcon={ <ArrowUpIcon/> }>Sign Up
//             </Button>
        
//         </Flex>
//       </Box>
//     </Flex>
//   )
// }

// //if logged in
// <Flex
//           align={["center", "center", "center", "center"]}
//           justify={["center", "space-between", "flex-end", "flex-end"]}
//           direction={["column", "row", "row", "row"]}
//           pt={[4, 4, 0, 0]}>

//             <Button
//                 size="sm"
//                 rounded="md"
//                 color={["primary.500", "primary.500", "blue", "blue"]}
//                 bg={["white", "white", "primary.500", "primary.500"]}
//                 leftIcon={ <SmallCloseIcon /> }
//                  >
//                 Logout
//             </Button>
        
//         </Flex>