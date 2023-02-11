import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { textsx,textButtonsx } from "../Themes/sxThemes"

const WorkerSignUp = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign up logic here
  };

  return (
    <div className="workersignup">
    <Box maxW="md" width="50%" borderWidth="1px" border="2px solid" rounded="lg" p="6" m="auto" textAlign="center" >
      <Text sx={textsx} mb="24px"> You are almost done!</Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} sx={textsx}>

          <div className="parent">
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="parent">
            <FormControl>
              <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
              <Input
                id="contactNumber"
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="parent">
            <FormControl>
              <FormLabel htmlFor="city">City</FormLabel>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormControl>
          </div>
          <Box>
            <Button m="auto" sx={textButtonsx} justifySelf="center" height={{ sm: "23px", md: "34px", lg: "43px", xl: "52px" }} width={{ sm: "150px", md: "180px", lg: "200px", xl: "230px" }} type="submit">Sign up</Button>
          </Box>
        </Stack>
      </form>
    </Box>
    </div>
  );
};

export default WorkerSignUp;
