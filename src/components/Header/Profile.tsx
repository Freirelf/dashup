import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
    <Box mr="4" textAlign="right">

      <Text> Lucas Freire</Text>
      <Text color="gray.300" fontSize="small"> 
        l.casfreirelopes@hotmail.com
      </Text>
    </Box>

    <Avatar size="md" name="Lucas Freire" src="https://github.com/Freirelf.png" />
  </Flex>
  )
}