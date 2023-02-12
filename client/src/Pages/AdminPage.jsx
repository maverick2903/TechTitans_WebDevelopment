import React, { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue, useColorMode, VStack, StackDivider
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'

export default function AdminPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [workerData, setWorkerData] = useState([])
  const toast = useToast()

  const getData = async () => {
    const jsonwebtoken = localStorage.getItem("jsonwebtoken");
    const res = await fetch("http://localhost:5000/admin/workerToBeVerified", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", body: JSON.stringify({
        jsonwebtoken,
      }),

    })
    const data = await res.json()
    console.log(data)
    setWorkerData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  const rejectWorker = async (worker) => {
    const username = worker.username

    const res = await fetch("http://localhost:5000/admin/deleteWorkerAdmin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ username })
    })

    if (res.status == 200) {
      toast({
        title: 'Account created!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: "bottom-right"
      })
    } else {
      toast({
        title: 'there was an error',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: "bottom-right"
      })
    }
  }

  const acceptWorker = async (worker) => {
    const username = worker.username
    console.log(username)
    console.log(username)
    const res = await fetch("http://localhost:5000/admin/verifyWorker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ username })
    })
    if (res.status == 200) {
      toast({
        title: 'Account created!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: "bottom-right"
      })
    } else {
      toast({
        title: 'there was an error',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: "bottom-right"
      })
    }
  }


  return (
    <>
      <Center py={6}>
        {workerData.map((worker) => (
          <VStack spacing={4} divider={<StackDivider borderColor="grey.100" />} align="stretch" >
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              w={{ sm: '100%', md: '540px', lg: "700px" }}
              height={{ sm: '476px', md: '20rem', lg: "27rem" }}
              direction={{ base: 'column', md: 'row' }}
              bg={colorMode == "dark" ? "white" : "gray.900"}
              boxShadow={'xl'}
              padding={4}
            >
              <Flex flex={1} bg="blue.200">
                <Image
                  objectFit="cover"
                  boxSize="100%"
                  src={
                    worker.idProof
                  }
                />
              </Flex>
              <Stack
                flex={1}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={1}
                pt={2}>
                <Heading color={colorMode == "dark" ? "blue.400" : "white"} fontSize={'2xl'} fontFamily={'body'} mb="40px">
                  {worker.name}
                </Heading>
                <Text className='username-vala' fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                  {"@" + worker.username}
                </Text>

                <Stack
                  width={'100%'}
                  mt={'2rem'}
                  direction={'row'}
                  padding={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}>

                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={
                      "green.700"
                    }
                    _focus={{
                      bg: 'green.200',
                    }}
                    boxShadow={
                      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                    }
                    color={'white'}
                    _hover={{
                      bg: 'green.900',
                    }}
                    onClick={() => { acceptWorker(worker) }}>
                    Verify
                  </Button>

                  <Button
                    flex={1}
                    fontSize={'sm'}
                    rounded={'full'}
                    bg={'red.400'}
                    color={'white'}

                    _hover={{
                      bg: 'red.700',
                    }}
                    _focus={{
                      bg: 'blue.500',
                    }}
                    onClick={() => { rejectWorker(worker) }}>
                    Reject
                  </Button>

                </Stack>
              </Stack>
            </Stack>
          </VStack>
        ))}

      </Center>

    </>
  )
}
