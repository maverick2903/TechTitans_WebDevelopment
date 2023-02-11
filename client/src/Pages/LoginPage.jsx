import {
  Box,
  Center,
  Divider,
  Flex,
  useColorMode,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function LoginPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { Auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  console.log(username);
  /*
  after logging in we set Auth to an objectuser{username:"",role:""}
  and then write this statement
  
  */

  const validateData = () => {};

  const handleSubmit = async (e) => {
    e.preventdefault();

    if (validateData()) {
      //api login
      const resp = await fetch("/user/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      //
      const data = await resp.json();
      if (resp.status === 401 || !data) {
        window.alert("Invalid username/password"); //Can replace with a toast or popup
      } else {
        window.alert("Login Successful"); //Can replace with a toast or popup
        setAuth({ user: data.username, role: role });
        navigate(from, { replace: true });
      }
    }
  };

  return (
    <div>
      <Flex>
        <Box
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          p="6"
          width="50%"
          left="0px"
          marginBottom="150px"
          marginTop="150px"
          marginEnd="20px"
          marginLeft="20px"
        >
          <Center>
            <Box>Login Here</Box>
          </Center>
          <form onSubmit={handleSubmit} method="POST">
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
        <Center h="90vh">
          <Divider
            orientation="vertical"
            size="xl"
            borderColor={colorMode === "dark" ? "yellow.100" : "orange.300"}
          />
        </Center>
      </Flex>
    </div>
  );
}
