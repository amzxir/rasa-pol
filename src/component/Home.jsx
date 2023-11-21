import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Box, Grid, Avatar } from '@mui/material'
import { FadeTransform } from "react-animation-components";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


export default function Home() {

  // start title 
  useEffect(() => {
    window.document.title = "رساپل - خانه"
  }, [])
  // end title 

  // fetch data service
  const service = [
    {
      id: 1,
      path: "/clinic",
      name: "ثبت کلینیک",
      path_img: "/image/shop.svg",
      slogan: "این یک متن تست است",
    },
    {
      id: 2,
      path: "/office",
      name: "ثبت مطب",
      path_img: "/image/shop.svg",
      slogan: "این یک متن تست است",
    },
    {
      id: 3,
      path: "/colleague-introduction",
      name: "معرفی همکار",
      path_img: "/image/shop.svg",
      slogan: "این یک متن تست است",
    },
    {
      id: 4,
      path: "https://rasadent.com/rasajet-panel",
      name: "ثبت سفارش",
      path_img: "/image/shop.svg",
      slogan: "این یک متن تست است",
    },
  ]; const [dataService, setDataService] = useState(service);
  // fetch data education

  return (
    <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Grid sx={{ mb: 2 }} container spacing={2}>
          {dataService.map((i, index) => {
            return (
              <Grid key={i.id} sx={{ pl: "10px !important", width: "100%" }} item xs={6}>
                <NavLink to={i.path} className="card-platform" state={i.name} >
                  <Avatar alt="Remy Sharp" src={i.path_img} />
                  <p className="name-platform">
                    {i.name}
                  </p>
                  <div className="content-platform">
                    <span className='card-home-span'>{i.slogan}</span>
                    <ChevronLeftIcon className="card-home-span" />
                  </div>
                </NavLink>
              </Grid>
            )
          })}
        </Grid>

        <NavLink to={"https://rasadent.com/rasajet-panel"} target="_black" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <img className="img-fluid" style={{ borderRadius: '15px' }} src="/image/1.jpg" alt="" />
        </NavLink>
        <NavLink to={"https://rasadent.com"} target="_black" style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <img className="img-fluid" style={{ borderRadius: '15px' }} src="/image/2.jpg" alt="" />
        </NavLink>
      </Box>
    </FadeTransform>
  )
}

