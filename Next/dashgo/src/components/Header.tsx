import { Flex, Input, Text, Icon, HStack, Box, Avatar } from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from "react-icons/ri";

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="3xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.400" }}
          px="4"
          mr="4"
        />

        <Icon alignSelf="center" fontSize="20" as={RiSearchLine} />
      </Flex>

      <Flex ml="auto" align="center">
        <HStack
          spacing="8"
          mx="8"
          paddingRight="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex align="center">
          <Box mr="4" textAlign="right">
            <Text>Gustavo Carmo</Text>
            <Text color="gray.300" fontSize="small">
              gustavo@hotmail.com
            </Text>
          </Box>

          <Avatar
            size="md"
            name="Gustavo Carmo"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/620b74cf-2071-4a49-9571-c97c1db1585d/df3gezw-6ec2dac5-c2ce-427c-b355-2d8279a766f7.png/v1/fill/w_1280,h_1112,strp/monkey_d__luffy__gear_5____updated_by_b_a_i_o_r_e_t_t_o_df3gezw-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTExMiIsInBhdGgiOiJcL2ZcLzYyMGI3NGNmLTIwNzEtNGE0OS05NTcxLWM5N2MxZGIxNTg1ZFwvZGYzZ2V6dy02ZWMyZGFjNS1jMmNlLTQyN2MtYjM1NS0yZDgyNzlhNzY2ZjcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.f9Ynpx3mSEYDWJFr7hhZm-pFxywC6hVMnKwUQZFuZgQ"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
