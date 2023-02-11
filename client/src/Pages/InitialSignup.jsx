import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function InitialSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "client") {
      navigate("/signup/client");
    } else if (role === "worker") {
      navigate("/signup/worker");
    }
  };
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" p="6" m="auto" >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {/*           <FormControl>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </FormControl> */}

          <FormLabel htmlFor="role">Role</FormLabel>
          <RadioGroup id="role" onChange={setRole} value={role}>
            <Stack direction="row">
              <Radio value="client">Client</Radio>
              <Radio value="worker">Worker</Radio>
            </Stack>
          </RadioGroup>

          <Button type="submit">Sign up</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default InitialSignup;
