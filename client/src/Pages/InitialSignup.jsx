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
import { textsx,textButtonsx } from "../Themes/sxThemes"
import useAuth from "../Hooks/useAuth";

function InitialSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const { Auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("/user/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    });
    //
    const data = await resp.json();
    if (resp.status === 401 || !data) {
      window.alert("Invalid username/password"); //Can replace with a toast or popup
    } else {
      window.alert("Login Successful"); //Can replace with a toast or popup
      setAuth({ user: data.username, role: data.role });
    }
    if (role === "client") {
      navigate("/clientsignup");
    } else if (role === "worker") {
      navigate("/workersignup");
    }
  };

  return (
      <Box  maxW="sm" borderWidth="1px" rounded="lg" p="6" m="auto" alignSelf="center" >
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} sx={textsx} method="post">
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
  );
}

export default InitialSignup;
