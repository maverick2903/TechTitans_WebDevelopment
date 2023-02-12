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
  useColorModeValue, useColorMode
} from '@chakra-ui/react';

export default function AdminPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [workerData, setWorkerData] = useState([])

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
    setWorkerData(data)
    console.log(data)
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
      body: username
    })
    if (res.status == 200) {

    } else {

    }
  }

  const acceptWorker = async (worker) => {
    const username = worker.username

    const res = await fetch("http://localhost:5000/admin/verifyWorker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: username
    })
    if (res.status == 200) {

    } else {

    }
  }


  return (
    <>
      <Center py={6}>
        {workerData.map((worker) => (
          <Stack
            borderWidth="1px"
            borderRadius="lg"
            w={{ sm: '100%', md: '540px', lg: "700px" }}
            height={{ sm: '476px', md: '20rem', lg: "27rem" }}
            direction={{ base: 'column', md: 'row' }}
            bg={colorMode == "dark" ? "white" : "gray.900"}
            boxShadow={'xl'}
            padding={4}>

            <Flex flex={1} bg="blue.200">
              <Image
                objectFit="cover"
                boxSize="100%"
                src={
                  //worker.idProof
                  //image of aadhar card
                  'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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
              <Heading fontSize={'2xl'} fontFamily={'body'} mb="40px">
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
        ))}
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: '100%', md: '540px', lg: "700px" }}
          height={{ sm: '476px', md: '20rem', lg: "27rem" }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'xl'}
          padding={4}>

          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              src={
                //image of aadhar card
                'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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
            <Heading fontSize={'2xl'} fontFamily={'body'} mb="40px">
              client name
            </Heading>
            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
              @client-username
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
                }}>

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
                }}>
                Reject
              </Button>
            </Stack>
          </Stack>
        </Stack>

      </Center>

    </>
  )
}
