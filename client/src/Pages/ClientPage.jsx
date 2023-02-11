import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Button,
  Stack,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
export default function ClientPage() {
  const [request, setRequest] = useState("");
  const [field, setField] = useState("");
  console.log(field);
  const handleChange = (event) => {
    setField(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //api login
    const resp = await fetch("/client/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqToClient: request,
        category: field,
      }),
    });
    //
    const data = await resp.json();
    if (resp.status === 401 || !data) {
      window.alert("Invalid details"); //Can replace with a toast or popup
    } else {
      window.alert("Successful"); //Can replace with a toast or popup
    }
  };

  return (
    <Box borderWidth="1px" rounded="lg" p="6" m="5em" textAlign="center">
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
        <Button colorScheme="blue">Button</Button>
      </form>
    </Box>
  );
}
