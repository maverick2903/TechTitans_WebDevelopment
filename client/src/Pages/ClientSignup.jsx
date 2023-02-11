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

const ClientSignUp = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign up logic here, such as sending a request to a server to register the user.
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

          <Button type="submit">Sign up</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ClientSignUp;
