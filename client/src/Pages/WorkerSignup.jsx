import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

const WorkerSignUp = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign up logic here
  };

  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" p="6" m="auto" textAlign="center">
      <Text> You are almost done!</Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="contactNumber">Contact Number</FormLabel>
            <Input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </FormControl>

          <Button type="submit">Sign up</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default WorkerSignUp;
