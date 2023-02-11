import { Box, Center, Divider, Grid, GridItem, Stack, Text,useColorMode } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from "../Hooks/useAuth"

export default function LoginPage() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { Auth,setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  /*
  after logging in we set Auth to an objectuser{username:"",role:""}
  and then write this statement
  
  */ 
  const handleSubmit = (event) =>{
    event.preventdefault()
    
    validateData()

    //api login
    //setAuth(user:user,role:role)

    navigate(from,{replace:true})
  }


  return (
    <div>
      <Box h="90vh">
          <Center h="90vh">
            <Divider orientation='vertical' size="xl" borderColor={colorMode=='dark'?"yellow.100":"orange.300"}/>
          </Center>
      </Box>
    </div>
  )
}
