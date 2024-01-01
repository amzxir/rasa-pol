import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material'
import { FadeTransform } from "react-animation-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import city from "../../data/city.json";
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as yup from "yup";


// regex error validation
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// validate form hook
const schema = yup.object().shape({
    // card_melli: yup.mixed().test("file", "فیلد کارت ملی اجباری است", (value) => {
    //     return value && value.length
    // }),
    card_un: yup.mixed().test("file", "فیلد کارت دانشجویی اجباری است", (value) => {
        return value && value.length
    }),
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
    name: yup.string().required('فیلد نام اجباری است'),
    // email: yup.string().required('فیلد ایمیل اجباری است'),
    code_melli: yup.string().required('فیلد کدملی اجباری است'),
    code_un: yup.string().required('فیلد کد دانشجویی اجباری است'),
    name_un: yup.string().required('فیلد نام دانشگاه اجباری است'),
    details: yup.string().required('فیلد سوال اجباری است'),
    study: yup.string().required('فیلد شهر محل تحصیل اجباری است'),
    city: yup.string().required('فیلد شهر محل اقامت اجباری است'),
    date: yup.string().required('فیلد سال ورودی اجباری است'),
    target: yup.string().required('فیلد هدف اصلی اجباری است'),
});


export default function Register() {

    // start title 
    useEffect(() => {
        window.document.title = "رساپل - ثبت نام"
    }, [])
    // end title 

    // start react hook form
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // end react hook form

    // start use navigate 
    const navigate = useNavigate();
    // end use navigate 

    // start function submit form
    const handleSubmits = async (data) => {

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const bodyParameters = {
            key: "value",
            mobile: data.mobile,
            national_code: `${data.code_melli}-${data.code_un}`,
            univ_name: data.name_un,
            edu_city: data.study,
            location: data.city,
            description: data.details,
            name: data.name,
            year_income: data.date,
            national_cart: data.card_un[0],
            student_cart: data.card_un[0],
            porpose: data.target
        }

        try {
            const response = await axios.post("https://rasa-dash-pol.reshe.ir/api/Sign-up", bodyParameters, config);
            console.log(response);
            if (response.data.status_code === 500) {
                toast.error('خطا در سرور مجدد تلاش کنید')
            } else if (response.data.status_code === 422) {
                toast.error(response.data.msg)
            } else if (response.data.status_code === 200) {
                // toast.success("تبریک با موفقیت ثبت نام شدید منتظر تایید حساب خود باشید");
                toast.success("به رساپل خوش آمدید");
                reset();
                localStorage.setItem("mobile", data.mobile);
                localStorage.setItem("token", 'asdasd378146ghsd!@3');
                navigate("/")
            }
        } catch (error) {
            console.error(error);
        }

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
                    <span className="error">{errors.code_un?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="کد دانشجویی" {...register("code_un")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.mobile?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره همراه" {...register("mobile")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    {/* <span className="error">{errors.email?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="ایمیل" {...register("email")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div> */}
                    <span className="error">{errors.name_un?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام دانشگاه" {...register("name_un")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.study?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("study")}>
                            <option value=''>شهر محل تحصیل را انتخاب کنید</option>
                            {city?.map((i,index) => {
                                return(
                                    <option key={i.id} value={i.name}>{i.name}</option>
                                )
                            })}
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.city?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("city")}>
                            <option value=''>شهر محل اقامت را انتخاب کنید</option>
                            {city?.map((i,index) => {
                                return(
                                    <option key={i.id} value={i.name}>{i.name}</option>
                                )
                            })}
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.date?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="سال ورودی" {...register("date")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <Grid container spacing={2}>
                        {/* <Grid xs={6} item>
                            <span className="error">{errors.card_melli?.message}</span>
                            <div className="form-groups">
                                <label className='card-melli' htmlFor="card_melli"><span className='span-card-melli'>{watch("card_melli")?.length !== 0 ? 'کارت ملی آپلود شد' : 'بارگذاری کارت ملی'}</span></label>
                                <input type="file" className='d-none' id='card_melli' {...register("card_melli")} />
                            </div>
                        </Grid> */}
                        <Grid xs={6} item>
                            {watch("card_un") === undefined || watch("card_un.length") === 0 ? 
                            <>
                                <span className="error">{errors.card_un?.message}</span>
                                <div className="form-groups">
                                    <label className='card-melli' htmlFor="card_un"><span className='span-card-melli'>{watch("card_un")?.length !== 0 ? 'بارگذاری کارت دانشجویی' : 'بارگذاری کارت دانشجویی'}</span></label>
                                    <input className='d-none' type="file" id='card_un' {...register("card_un")} />
                                </div>
                            </>
                            :
                            <div className="form-groups">
                                <img width={150} height={150} src={URL?.createObjectURL(watch("card_un.[0]"))} alt="" />                            
                            </div>
                        }
                        </Grid>
                    </Grid> 
                    <span className="error">{errors.target?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="هدف اصلی از شرکت در طرح" {...register("target")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.details?.message}</span>
                    <div className="form-groups">
                        <textarea className="textarea-form" type="text" style={{ height: '200px' }} placeholder="در پایان طرح چه چیزی به دست بیارید راضی هستید ؟" {...register("details")}></textarea>
                    </div>
                    <div>
                        <button className="btn-form"><span className="btn-span-code">ثبت</span></button>
                    </div>
                </form>
            </Box>
        </FadeTransform>
    )
}

