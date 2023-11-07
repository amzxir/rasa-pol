import React, { useContext } from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import { FadeTransform } from "react-animation-components";
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import * as yup from "yup";
import axios from "axios";
import Context from "../../../context/context";
import fa from "../../../lang/fa.json";

// regex error validation
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// validate form hook
const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
});

export default function Login(props) {
    // start function darkmode
    const { spinner, setSpinner, mobile } = useContext(Context);
    // end function darkmode

    // start react hook form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // end react hook form

    // start function send mobile
    const handleSubmits = async (data) => {
        setSpinner(true)
        const mobile = data;
        try {
            const response = await axios.post("https://rasadent.reshe.ir/api/SendOtp", mobile);
            if (response.data.status_code === 422) {
                toast.error(response.data.msg)
            } else if (response.data.status_code === 200) {
                toast.success(response.data.msg)
            }
            setSpinner(false)
            localStorage.setItem("mobile", data.mobile);
            // console.log(response);
            props.nextStep(data);
        } catch (error) {
            setSpinner(false)
            // console.error(error);
        }
    };
    // end function send mobile
    return (
        <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
            <Box>
                <div className="content-form-login">
                    <img className="img-fluid" src="/image/identification.svg" alt="" />
                    <h1 className="h1-login">{fa["Login and Register"]}</h1>
                    <p className="title-login-form">
                        {fa["Enter your mobile"]}
                    </p>
                    <p className="title-login-form">
                        {fa["The activation code will be sent to this number"]}
                    </p>
                </div>
                <div className="form-auth">
                    <form onSubmit={handleSubmit(handleSubmits)}>
                        <div className="mb-3">
                            <div className="form-group" style={{ direction:'rtl' }}>
                                <input className="input-login" type="number" inputMode="numeric" placeholder="شماره همراه خود را وارد کنید" {...register("mobile")} />
                                <FingerprintIcon className="svg-login" />
                            </div>
                            <span className="error">{errors.mobile?.message}</span>
                        </div>
                        <button className="btn-login" disabled={spinner}>{fa["Get code"]}{spinner ? <div class="lds-dual-ring"></div> : ''}</button>
                    </form>
                </div>
            </Box>
        </FadeTransform>
    )
}

