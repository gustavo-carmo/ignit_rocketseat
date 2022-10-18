import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ListUser() {
  const { data, isLoading, error } = useQuery<User[]>('users', async () => {
    const response = await fetch('https://localhost:3000/api/users');
    const data = await response.json();

    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }
    });

    return users;
  }, {
    staleTime: 1000 * 10, // 10 seconds
  });

  const isWideVersionMedium = useBreakpointValue({
    base: false,
    md: true
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar Novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter os dados</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]} color="gray.300" width="8">
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersionMedium && (<Th>Data de cadastro</Th>)}
                      <Th width="8"></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersionMedium && (<Td>{user.createdAt}</Td>)}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="small"
                            colorScheme="purple"
                            borderRadius="full"
                            leftIcon={<Icon alignSelf="center" as={RiPencilLine} fontSize="16" />}
                          >
                            {!isWideVersionMedium ?? 'Editar'}
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination />
              </>
            )
          }
        </Box>
      </Flex>
    </Box>
  );
}
