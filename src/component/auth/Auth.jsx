import React from 'react'
import { Box } from "@mui/material";
import WizardForm from "react-wizard-form";
import Login from './step-one/Login';
import AuthenticationCode from './step-two/AuthenticationCode';

export default function Auth() {
  return (
    <Box sx={{ mt: 5, mb: 5 }}>
      <WizardForm>
        <Login/>
        <AuthenticationCode/>
      </WizardForm>
    </Box>
  )
}

