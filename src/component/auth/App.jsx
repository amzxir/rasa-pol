import React from 'react'
import { Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { FadeTransform } from "react-animation-components";


export default function App() {
    return (
        <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
            <Box sx={{ mt: 5, mb: 5 }}>
                <div className='home-app'>
                    <div className="img-center">
                        <img className='img-fluid' src="/image/register.svg" alt="" />
                    </div>
                    <NavLink to={"/login"} state={"ورود"} className="btn-link">
                        <span className="btn-span-link">ورود</span>
                    </NavLink>
                    <NavLink to={"/register"} state={"ثبت نام"} className="btn-link">
                        <span className="btn-span-link">درخواست عضویت</span>
                    </NavLink>
                </div>
            </Box>
        </FadeTransform>
    )
}

