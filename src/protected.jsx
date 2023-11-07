import React, { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import Context from "./context/context";


export default function Protected() {
    // start fetch context
    const { token } = useContext(Context)
    // end fetch context
    if (!token) {
        return <Navigate to='/app' replace />
    }
    return <Outlet />
}

