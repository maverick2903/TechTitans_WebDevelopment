import React from 'react'
import { useContext } from 'react'
import AuthContext from '../Contexts/AuthProvider'
import { Button, useColorMode, Flex, Heading, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Spacer } from '@chakra-ui/react'
import { ChevronDownIcon, SunIcon, MoonIcon, ChevronUpIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRef } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {


  const { Auth } = useContext(AuthContext)
  const secondItem = useRef(null)
  const firstItem = useRef(null)
  const [selectedButton, setSelectedButton] = useState()
  const { colorMode, toggleColorMode } = useColorMode()

  const abc = {
    color: colorMode == "dark" ? "pink" : "yellow"
  }
  
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
    <Flex sx={abc} as="nav" alignItems="center" gap="10px" my="9px" height="5vh">
      <Heading marginLeft="18px"> TITLE </Heading>
      <Spacer />

      <HStack gap={5}>

        <Link as={NavLink} to="/aboutus" >About us</Link>
        {!Auth && <Link as={NavLink} to="/contactus">Contact us</Link>
        }

        <Menu closeOnSelect={false} initialFocusRef={selectedButton == true ? secondItem : firstItem}>
          {({ isOpen }) => (
            <>
              <MenuButton _expanded={{}} isActive={isOpen} as={Button} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
                Theme
              </MenuButton>
              <MenuList borderRadius="2px" paddingBottom="0" paddingTop="0" border="solid 1px"  >
                <MenuItem ref={firstItem} onClick={() => { dealingWithThemeAndRef(1) }} icon={colorMode == 'dark' ? < SunIcon /> : <MoonIcon />}>{colorMode == 'dark' ? "Light" : "Dark"} </MenuItem>
                <MenuItem ref={secondItem} onClick={() => { dealingWithThemeAndRef(2) }} icon={<ExternalLinkIcon />}> System Default</MenuItem>
              </MenuList>
            </>
          )

          }
        </Menu>
      </HStack>

    </Flex>
  )
}
