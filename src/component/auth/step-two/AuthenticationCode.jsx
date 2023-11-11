import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify'
import { FadeTransform } from "react-animation-components";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from "axios";
import Context from "../../../context/context";
import fa from "../../../lang/fa.json";

export default function AuthenticationCode(props) {
    // start react router dom use navigate
    let navigate = useNavigate();
    // end react router dom use navigate

    // start function darkmode
    const { spinner, setSpinner } = useContext(Context);
    // end function darkmode

    // start react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();
    // end react hook form

    // start function and state in timer code
    const [timer, serTimer] = useState(60);
    useEffect(() => {
        const times = timer > 0 && setInterval(() => serTimer(timer - 1), 1000);
        return () => clearInterval(times);
    }, [timer]);
    // end function and state in timer code

    // start fetch data in first component (login)
    const mobile = props.data.mobile;
    // end fetch data in first component (login)

    // start function and state in otp input
    const [otp, setOpt] = useState(new Array(4).fill(""));

    const handelChnage = (element, index) => {
        if (isNaN(element.value)) return false;

        setOpt([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // focus next input

        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    // end function and state in otp input

    // start function reset mobile
    const chnageMobile = () => {
        props.previousStep();
    };
    // end function reset mobile

    // start handel submit login
    const handelFinalSubmit = async () => {
        // setSpinner(true)
        // const verOtp = otp.join("");
        // const verify = {
        //     mobile: props.data.mobile,
        //     code: verOtp,
        // }
        // // console.log(verOtp)
        // try {
        //     const response = await axios.post("https://rasadent.reshe.ir/api/VerifyOtp", verify);
        //     // console.log(response);

        //     if (response.data.msg === "data invalid") {
        //         setSpinner(false)
        //         toast.success(response.data.msg)
        //     } else if (response.data.token) {
        //         setSpinner(false)
        //         const getToken = response.data.token;
        //         localStorage.setItem("token", getToken);
        //         toast.success("به پل خوش آمدید");
        //         navigate("/");

        //     }
        //     // console.log(response);

        // } catch (error) {
        //     // console.error(error);
        //     setSpinner(false)
        // }
        const getToken = 'sjakdhjksakdh5233446235adshg';
        localStorage.setItem("token", getToken);
        toast.success("به پل خوش آمدید");
        navigate("/");
    };
    // end handel submit login

    // start handel send agian code 
    const [limit, setLimit] = useState(true);

    const handelSendAgain = async () => {
        setSpinner(true)
        const mobile = props.data;
        try {
            const response = await axios.post("https://rasadent.com/api/SendOtp", mobile);
            if (response.data.status_code === 422) {
                toast.error(response.data.msg)
            } else if (response.data.status_code === 200) {
                toast.success(response.data.msg)
            }
            setSpinner(false)
            setLimit(false);
            // console.log(response);
        } catch (error) {
            setSpinner(false)
            // console.error(error);
        }
    }
    // end handel send agian code 
    return (
        <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
            <Box className="form_code">
                <h1 className="h1-code">{fa["Verification of identity code"]}</h1>
                <div className="timer">
                    <span className="span-code-1">{timer}</span>
                </div>

                <p className="text-mobile">
                    {fa["Code for the number"]} <span className="span-code-2">{mobile}</span> {fa["has been sent"]}
                </p>
                <form onSubmit={handleSubmit(handelFinalSubmit)} className="send_code">
                    <div className="form-flex">
                        {otp.map((data, index) => {
                            return (
                                <input
                                    key={index}
                                    value={data}
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => handelChnage(e.target, index)}
                                    className="form-controll"
                                    name="otp"
                                    maxLength="1"
                                    type="number"
                                    inputMode="numeric"
                                />
                            );
                        })}
                    </div>
                    <button onClick={handelFinalSubmit} className="btn-code"><span className="btn-span-code">{fa["login"]}</span><ChevronLeftIcon className="btn-span-code" /></button>
                </form>

                <div className="re-send">
                    <p className="text-two">
                        {fa["I did not receive the code"]}
                        <span onClick={limit === true ? handelSendAgain : null} className="text-one">
                            {fa["Send agian"]}
                        </span>
                    </p>
                    <p
                        onClick={chnageMobile}
                        className="text-there">
                        {fa["Change number"]}
                    </p>
                </div>
            </Box>
        </FadeTransform>
    )
}

