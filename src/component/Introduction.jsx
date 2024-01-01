import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import { FadeTransform } from "react-animation-components";
import { QRCodeSVG } from 'qrcode.react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as yup from "yup";


// // regex error validation
// const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// // validate form hook
// const schema = yup.object().shape({
//     mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
//     name: yup.string().required('فیلد نام اجباری است'),
//     name_un: yup.string().required('فیلد نام دانشگاه اجباری است'),
//     details: yup.string().required('فیلد سوال اجباری است'),
//     study: yup.string().required('فیلد شهر محل تحصیل اجباری است'),
//     city: yup.string().required('فیلد شهر محل اقامت اجباری است'),
//     date: yup.string().required('فیلد سال ورودی اجباری است'),
// });


export default function introduction() {
    // start title 
    useEffect(() => {
        window.document.title = "رساپل - معرفی همکار"
    }, [])
    // end title 

    // // start react hook form
    // const { register, handleSubmit, reset, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema),
    // });
    // // end react hook form

    // // start function submit form
    // const handleSubmits = (data) => {
    //     console.log(data)
    //     reset();
    //     toast.success('با موفقیت ثبت شد')
    // }
    // // end function submit form

    return (
        <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
            <Box sx={{ mt: 5, mb: 5 }}>
                <div className='img-center'>
                    <QRCodeSVG className='img-fluid' value="https://rasa-dash-pol.reshe.ir/" />
                </div>
                <p className='title-login-form' style={{ fontSize: '16px' }}>برای ثبت همکار لطفا بارکد را اسکن کنید</p>
                {/* <form onSubmit={handleSubmit(handleSubmits)}>
                    <span className="error">{errors.name?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام و نام خانوادگی" {...register("name")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.mobile?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره همراه" {...register("mobile")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.name_un?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام دانشگاه" {...register("name_un")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.study?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("study")}>
                            <option value=''>شهر محل تحصیل را انتخاب کنید</option>
                            <option value="1">تهران</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.city?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("city")}>
                            <option value=''>شهر محل اقامت را انتخاب کنید</option>
                            <option value="1">تهران</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.date?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="سال ورودی" {...register("date")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.details?.message}</span>
                    <div className="form-groups">
                        <textarea className="textarea-form" type="text" style={{ height: '200px' }} placeholder="توضیحات" {...register("details")}></textarea>
                    </div>
                    <div>
                        <button className="btn-form"><span className="btn-span-code">ثبت</span></button>
                    </div>
                </form> */}
            </Box>
        </FadeTransform>
    )
}

