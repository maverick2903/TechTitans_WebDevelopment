import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Button,
  Stack,
  Center,
  Text,
  Flex,
  Heading,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ClientPage() {
  const navigate = useNavigate();
  const [request, setRequest] = useState("");
  const [field, setField] = useState("");
  const handleChange = (event) => {
    setField(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //api login
    const resp = await fetch("http://localhost:5000/client/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqToClient: request,
        category: field,
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (resp.status === 401 || !data) {
      window.alert("Invalid details"); //Can replace with a toast or popup
    } else {
      window.alert("Successful"); //Can replace with a toast or popup
    }
  };

  return (
    <div>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                GigGuru
              </Text>
              <br />{" "}
              <Text color={"blue.400"} as={"span"}>
                gets it done
              </Text>{" "}
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              GigGuru is the perfect solution for all your daily work
              requirements. We connect you to trusted people who'll do the job
              you want to do.
            </Text>
            <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                <a href="#newReq">Create New Request</a>
              </Button>

              <Button
                onClick={() => navigate("/clientpagerequests")}
                rounded={"full"}
              >
                Ongoing Requests
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Login Image"}
            objectFit={"cover"}
            borderRadius="20px"
            src={
              "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
          />
        </Flex>
      </Stack>
      <div id="newReq">
        <Stack>
          <Box
            borderWidth="1px"
            rounded="lg"
            p="6"
            m="5em"
            textAlign="center"
            backgroundColor={"blue.400"}
          >
            <Text>New Request</Text>
            <form method="POST" onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="field">Select category of work</FormLabel>
                <Select
                  placeholder="Select option"
                  id="field"
                  value={field}
                  onChange={handleChange}
                >
                  <option value="Plumber">Plumber</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Packers and Movers">Packers and Movers</option>
                  <option value="Housework">Housework</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="request">Post your request here</FormLabel>
                <Input
                  id="request"
                  type="text"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                />
              </FormControl>
              <Center>
                <Button type="submit" marginTop="20px" colorScheme="green">
                  Submit Request
                </Button>
              </Center>
            </form>
          </Box>
        </Stack>
      </div>
    </div>
  );
}
