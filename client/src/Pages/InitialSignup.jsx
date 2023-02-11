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
import useAuth from "../Hooks/useAuth";
import { textsx, textButtonsx } from "../Themes/sxThemes"

function InitialSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [prevPageData, setPrevPageData] = useState("")
  const [role, setRole] = useState("");
  const { Auth, setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/user/newUser", {
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
    const data = await resp.json();
    const prevPageData = { username,password,role }
    if (resp.status === 200) {
      window.alert("Login Successful");
      setAuth({ user: data.username, role: data.role });
    }
    else {
      window.alert("Invalid username/password");

    }
    if (role === "client") {
      navigate("/clientsignup", { state: prevPageData });
    } else if (role === "worker") {
      navigate("/workersignup" , { state: prevPageData } );
    }
  };

  return (
    <div className="workersignup">
      <Box maxW="md" width="50%" borderWidth="1px" border="2px solid" rounded="lg" p="6" m="auto" textAlign="center" >
        <form onSubmit={handleSubmit}>
          <Stack sx={textsx} spacing={4} method="post" >

            <div className="parent">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
            </div>

            <div className="parent">
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </div>

            <Box>
              <FormLabel htmlFor="role">Role</FormLabel>
              <RadioGroup id="role" onChange={setRole} value={role}>
                <Stack direction="row">
                  <Radio value="client">Client</Radio>
                  <Radio value="worker">Worker</Radio>
                </Stack>
              </RadioGroup>
            </Box>

            <Box>
              <Button m="auto" sx={textButtonsx} justifySelf="center" height={{ sm: "23px", md: "38px", lg: "43px", xl: "52px" }} width={{ sm: "150px", md: "180px", lg: "200px", xl: "230px" }} type="submit">Sign up</Button>
            </Box>

          </Stack>
        </form>
      </Box>
    </div>
  );
}

export default InitialSignup;
