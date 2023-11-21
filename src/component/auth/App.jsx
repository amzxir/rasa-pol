import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { FadeTransform } from "react-animation-components";


export default function App() {

    // start title 
    useEffect(() => {
        window.document.title = "رساپل"
    }, [])
    // end title 
    
    return (
        // <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
        <Box>
            <div className='home-app'>
                <div className="app-login">
                    <div className='layouts-relative'>
                        <img className='w-100' src="/image/app.svg" alt="" />
                        <img className='img-absolute' src="/image/img.svg" alt="" />
                    </div>
                </div>
                <div className='mt-app'>
                    <NavLink to={"/login"} state={"ورود"} className="btn-link">
                        <span className="btn-span-link">ورود</span>
                    </NavLink>
                    <NavLink to={"/register"} state={"ثبت نام"} className="btn-link-2">
                        <span className="btn-span-link-2">درخواست عضویت</span>
                    </NavLink>
                </div>
            </div>
        </Box>
        // </FadeTransform>
    )
}

