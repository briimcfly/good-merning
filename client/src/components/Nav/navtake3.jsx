
import { Box, Flex, Text, Button, Input, Heading, Spacer } from "@chakra-ui/react"

export default function Navbar() {
  return (
    <Flex as="nav" p="16">
      <Heading as="h1">Dweller</Heading>

      <Input placeholder='Select a new city'></Input>
      <Button></Button>
      <Spacer />

      <Button leftIcon={ < ArrowRightIcon /> } variant="outline
      ">Login</Button>
      <Button leftIcon={ <ArrowUpIcon/> } >Sign Up</Button>

    </Flex>
  )
}

// export default Navbar;