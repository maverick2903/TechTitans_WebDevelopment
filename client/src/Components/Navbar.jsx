import React from 'react'
import { Button, useColorMode, Flex, Heading, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Spacer, IconButton } from '@chakra-ui/react'
import { ChevronDownIcon, SunIcon, MoonIcon, ChevronUpIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {Navlinksx,menusx,iconsx} from "../Themes/sxThemes"
import {titleLogosx} from "../Themes/sxThemes"
import useAuth from "../Hooks/useAuth"

export default function Navbar() {

  const { Auth } = useAuth()
  const secondItem = useRef(null)
  const firstItem = useRef(null)
  const [selectedButton, setSelectedButton] = useState()
  const { colorMode, toggleColorMode } = useColorMode()

  const dealingWithThemeAndRef = (x) => {
    if (x == 1) {
      setSelectedButton(false)
      toggleColorMode()
      console.log(colorMode)
    } else {
      setSelectedButton(true)
    }

  }

  return (
    <Flex sx={Navlinksx}  as="nav" alignItems="center" gap="10px" my="9px" height="5vh" >
      <Heading marginLeft="18px" sx={titleLogosx}> TITLE </Heading>
      <Spacer />

      <HStack gap={5}>

        {Auth?.user?.role=="client" && <Link as={NavLink} to="/userpagerequest">Send Request</Link>}
        {Auth?.user?.role=="worker" && <Link as={NavLink} to="/userpagerequest">Client itneractions</Link>}

        <Link as={NavLink}  to="/aboutus" >About us</Link>
        {!Auth && <Link as={NavLink} to="/contactus">Contact us</Link>
        }

        <IconButton  sx={iconsx} onClick={()=>{toggleColorMode()}} icon={colorMode=="dark"?< SunIcon />:<MoonIcon />}> </IconButton>

      </HStack>

    </Flex>
  )
}
