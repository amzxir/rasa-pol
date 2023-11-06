import React, { useRef, useEffect } from 'react'
import { Box, Container } from '@mui/material';
import { useLocation } from "react-router-dom";
import Header from './Header';

export default function Layouts(props) {

    // start function scroll top
    const ref = useRef()
    useEffect(() => ref.current.scrollTo(0, 0));
    // start function scroll top 

    // start find locarion in application
    let location = useLocation();
    let path = location.pathname;
    // end find locarion in application

    return (
        <Box className="super-app-container-light">
            {path !== "/login" ? <Header /> : null}
            <Container maxWidth="sm">
                <div ref={ref} className="scroll-auto-light">
                    {props.children}
                </div>
            </Container>
        </Box>
    )
}

