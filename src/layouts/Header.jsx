import React from 'react'
import { Container, Grid, Avatar, Stack, IconButton, Badge } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header() {

    // start variable react router dom
    const location = useLocation();
    let path = location.pathname;
    let navigate = useNavigate();
    // end variable react router dom

    // start get mobile 
    const mobile = localStorage.getItem("mobile");
    // end get mobile 

    return (
        <Container maxWidth="sm" className="navbar-fixed">
            {path !== "/" ?
                <div className="header-back">
                    <div className="title_navigate">
                        {location.state}
                    </div>
                    <IconButton onClick={() => navigate(-1)} className="back">
                        <ArrowBackIosIcon />
                    </IconButton>
                </div>
                :
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Stack direction="row">
                            <div>
                                <Avatar alt="Remy Sharp" src="/image/avatar.png" />
                            </div>
                            <div className="header_right">
                                <p className="text_welcome">
                                    👋 خوش آمدید
                                </p>
                                <p className="text_name">
                                    {mobile}
                                </p>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid item xs={3}>
                        <Stack className="icon-header" spacing={1} direction="row">
                            <NavLink>
                                <IconButton>
                                    <NotificationsNoneIcon />
                                </IconButton>
                            </NavLink>
                        </Stack>
                    </Grid>
                </Grid>
            }
        </Container>
    )
}

