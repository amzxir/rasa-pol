import React, { useState } from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import * as yup from "yup";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// start data input select multip
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
// end data input select multip

// regex error validation
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// validate form hook
const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
    name: yup.string().required('فیلد نام اجباری است'),
    details: yup.string().required('فیلد سوال اجباری است'),
    state: yup.string().required('فیلد استان اجباری است'),
    city: yup.string().required('فیلد شهر اجباری است'),


});



export default function introduction() {

    // start multip select 
    const [personName, setPersonName] = React.useState([]);
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [brand, setBrand] = React.useState([]);
    const handleChangeBrand = (event) => {
        const {
            target: { value },
        } = event;
        setBrand(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    // end multip select 

    // start react hook form
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // end react hook form

    // start function submit form
    const handleSubmits = (data) => {
        console.log(data)
        reset();
        toast.success('با موفقیت ثبت شد')
    }
    // end function submit form

    return (
        <Box sx={{ mt: 5, mb: 5 }}>
            <form onSubmit={handleSubmit(handleSubmits)}>
                <div className="form-groups">
                    <input className="input-form" type="text" placeholder="نام و نام خانوادگی" {...register("name")} />
                    <CreateIcon className="svg-form" fontSize='small' />
                </div>
                <span className="error">{errors.name?.message}</span>
                <div className="form-groups">
                    <input className="input-form" type="number" inputMode="numeric" placeholder="شماره همراه" {...register("mobile")} />
                    <CreateIcon className="svg-form" fontSize='small' />
                </div>
                <span className="error">{errors.mobile?.message}</span>
                <div className="form-groups">
                    <select className="select-form" {...register("state")}>
                        <option value=''>استان را انتخاب کنید</option>
                        <option value="1">تهران</option>
                    </select>
                </div>
                <span className="error">{errors.state?.message}</span>
                <div className="form-groups">
                    <select className="select-form" {...register("city")}>
                        <option value=''>شهر را انتخاب کنید</option>
                        <option value="1">تهران</option>
                    </select>
                </div>
                <span className="error">{errors.city?.message}</span>
                <div className="form-groups">
                    <textarea className="textarea-form" type="text" style={{ height: '200px' }} placeholder="توضیحات" {...register("details")}></textarea>
                </div>
                <span className="error">{errors.details?.message}</span>
                <div>
                    <button className="btn-form"><span className="btn-span-code">ثبت</span></button>
                </div>
            </form>
        </Box>
    )
}

