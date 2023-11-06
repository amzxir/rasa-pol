import React, { useMemo, useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Context from "./context/context";
import Layouts from "./layouts/layouts";
import Home from "./component/home";
import Protected from "./protected";
import Auth from "./component/auth/Auth";
import 'react-toastify/dist/ReactToastify.css';
import Clinic from "./component/Clinic";
import Office from "./component/Office";
import Introduction from "./component/Introduction";



export default function App() {

  // start fetch data token in authentication
  const token = localStorage.getItem("token");
  const mobile = localStorage.getItem("mobile");
  const location = useLocation();
  // end fetch data token in authentication

  // start state loading 
  const [spinner, setSpinner] = useState(false);
  // end state loading 
  return (
    <Context.Provider value={{ token, spinner, setSpinner, mobile }}>
      <Layouts>
        <Routes key={location.key} location={location}>
          <Route path="/login" element={<Auth />}></Route>
          <Route element={<Protected />}>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/clinic" element={<Clinic />}></Route>
            <Route path="/office" element={<Office />}></Route>
            <Route path="/colleague-introduction" element={<Introduction />}></Route>
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          rtl={true}
          theme="colored"
          style={{ zIndex: '100000' }}
        />
      </Layouts>
    </Context.Provider>
  )
}

