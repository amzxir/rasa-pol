import React from 'react'
import { Box, Grid } from '@mui/material'
import { FadeTransform } from "react-animation-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as yup from "yup";


// regex error validation
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// validate form hook
const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
    name: yup.string().required('فیلد نام اجباری است'),
    email: yup.string().required('فیلد ایمیل اجباری است'),
    code_melli: yup.string().required('فیلد کدملی اجباری است'),
    name_un: yup.string().required('فیلد نام دانشگاه اجباری است'),
    details: yup.string().required('فیلد سوال اجباری است'),
    study: yup.string().required('فیلد شهر محل تحصیل اجباری است'),
    city: yup.string().required('فیلد شهر محل اقامت اجباری است'),
    date: yup.string().required('فیلد سال ورودی اجباری است'),
    target: yup.string().required('فیلد هدف اصلی اجباری است'),
    card_melli: yup.mixed().test("file", "فیلد کارت ملی اجباری است", (value) => {
        if (value.length > 0) {  
          return true;
        }
        return false;
    }),
    card_un: yup.mixed().test("file", "فیلد کارت دانشجویی اجباری است", (value) => {
        if (value.length > 0) {  
          return true;
        }
        return false;
    }),
});


export default function Register() {

    // start react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // end react hook form

    // start function submit form
    const handleSubmits = (data) => {
        console.log(data)
        reset();
        toast.success('تبریک با موفقیت ثبت نام شدید')
    }
    // end function submit form

    return (
        <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
            <Box sx={{ mt: 5, mb: 5 }}>
                <form onSubmit={handleSubmit(handleSubmits)}>
                    <span className="error">{errors.name?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام و نام خانوادگی" {...register("name")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.code_melli?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="کدملی" {...register("code_melli")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.mobile?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره همراه" {...register("mobile")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.email?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="ایمیل" {...register("email")} />
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
                    <Grid container spacing={2}>
                        <Grid xs={6} item>
                            <span className="error">{errors.card_melli?.message}</span>
                            <div className="form-groups">
                                <label className='card-melli' htmlFor="card_melli"><span className='span-card-melli'>بارگذاری کارت ملی</span></label>
                                <input className='d-none' type="file" id='card_melli' {...register("card_melli")} />
                            </div>
                        </Grid>
                        <Grid xs={6} item>
                            <span className="error">{errors.card_un?.message}</span>
                            <div className="form-groups">
                                <label className='card-melli' htmlFor="card_un"><span className='span-card-melli'>بارگذاری کارت دانشجویی</span></label>
                                <input className='d-none' type="file" id='card_un' {...register("card_un")} />
                            </div>
                        </Grid>
                    </Grid>
                    <span className="error">{errors.target?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="هدف اصلی از طرح" {...register("target")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.details?.message}</span>
                    <div className="form-groups">
                        <textarea className="textarea-form" type="text" style={{ height: '200px' }} placeholder="در پایان طرح چه چیزی و به دست بیارید راضی هستید ؟" {...register("details")}></textarea>
                    </div>
                    <div>
                        <button className="btn-form"><span className="btn-span-code">ثبت</span></button>
                    </div>
                </form>
            </Box>
        </FadeTransform>
    )
}

