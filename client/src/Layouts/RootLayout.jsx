import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'
import Sidebar from '../Components/Sidebar'
import { Box, useColorMode } from '@chakra-ui/react'


export default function RootLayout() {

    return (
        <Box>
            <div className='root-layout'>
                <Navbar />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </Box>
    )
}
