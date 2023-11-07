import React, { useState } from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import { FadeTransform } from "react-animation-components";
import * as yup from "yup";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
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
    'درمان ریشه',
    'ترمیمی',
    'جراحی و کشیدن',
    'جرمگیری',
    'جراحی لثه',
    'ارتودنسی',
    'بیلیچینگ',
    'وینرو لامینت',
    'کودکان',
    'ایمپلنت',
];
// end data input select multip

// regex error validation
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// validate form hook
const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
    // active_shift: yup.string().required('فیلد شیفت فعال اجباری است'),
    name: yup.string().required('فیلد نام پزشک اجباری است'),
    system_number: yup.string().required('فیلد شماره نظام پزشکی اجباری است'),
    phone: yup.string().required('فیلد شماره ثابت اجباری است'),
    office_worker: yup.string().required('فیلد عمرفعال مطب اجباری است'),
    // common_treatment_center: yup.string().required('فیلد درمان شایع مرکز اجباری است'),
    // brand: yup.string().required('فیلد برند اجباری است'),
    details: yup.string().required('فیلد سوال اجباری است'),
    matrial: yup.string().required('فیلد روش تهیه مواد مصرفی اجباری است'),
    // buy: yup.string().required('فیلد شرایط خرید اجباری است'),

});



export default function Office() {

    // start multip select 

    const [buy, setBuy] = useState();

    const handelBuy = (e) => {
        setBuy(e.target.value)
    }

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
        <FadeTransform in transformProps={{ exitTransform: 'translateX(-100px)' }}>
            <Box sx={{ mt: 5, mb: 5 }}>
                <form onSubmit={handleSubmit(handleSubmits)}>
                    {/* <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شیفت فعال" {...register("active_shift")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.active_shift?.message}</span> */}
                    <span className="error">{errors.name?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام پزشک" {...register("name")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.system_number?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره نظام پزشکی" {...register("system_number")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.mobile?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره همراه" {...register("mobile")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.phone?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره ثابت" {...register("phone")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.office_worker?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="عمرفعال مطب" {...register("office_worker")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.matrial?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("matrial")}>
                            <option value=''>روش تهیه مواد مصرفی را انتخاب کنید</option>
                            <option value="1">سفارش اینترنتی از شرکت های وار کننده یا تولید کننده</option>
                            <option value="1">سفارش اینترنتی از شرکت های توزیع کننده</option>
                            <option value="1">شفارش از یک فروشنده</option>
                            <option value="1">مراجعه حصوری به بازار</option>
                            <option value="1">خرید از نمایشگاه</option>
                        </select>
                    </div>
                    {/* <span className="error">{errors.buy?.message}</span> */}
                    <div className="form-groups">
                        <select className="select-form" onChange={handelBuy}>
                            <option value=''>شرایط خرید را انتخاب کنید</option>
                            <option value="نقدی">نقدی</option>
                            <option value="شرایط">شرایط</option>
                        </select>
                    </div>
                    {buy === "نقدی" ?
                        <div className="form-groups">
                            <select className="select-form">
                                <option value=''>جزیات خرید را انتخاب کنید</option>
                                <option value="پرداخت - ارسال">پرداخت - ارسال</option>
                                <option value="ارسال - پرداخت">ارسال - پرداخت</option>
                            </select>
                        </div>
                    : null}
                    {buy === "شرایط" ?
                        <div className="form-groups">
                            <input className="input-form" type="text" placeholder="شرایط را خلاصه وارد کنید" />
                            <CreateIcon className="svg-form" fontSize='small' />
                        </div>
                    : null}
                    <div className="form-groups">
                        <select className="select-form" {...register("satisfaction")}>
                            <option value=''>میزان رضایت از تامین کننده را انتخاب کنید</option>
                            <option value="1">خیلی راضی</option>
                            <option value="1">راضی</option>
                            <option value="1">ناراضی</option>
                            <option value="1">شاکی</option>
                        </select>
                    </div>
                    <div className="form-groups">
                        <Select
                            // {...register("common_treatment_center")}
                            sx={{ pr: 0 }}
                            className="input-form"
                            multiple
                            displayEmpty
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em className="select-font">درمان شایع مرکز</em>;
                                }

                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem dir='rtl' disabled value="">
                                <em>درمان شایع مرکز</em>
                            </MenuItem>
                            {names.map((name) => (
                                <MenuItem
                                    dir='rtl'
                                    key={name}
                                    value={name}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* <span className="error">{errors.common_treatment_center?.message}</span> */}
                    <div className="form-groups">
                        <Select
                            // {...register("brand")}
                            sx={{ pr: 0 }}
                            className="input-form"
                            multiple
                            displayEmpty
                            value={brand}
                            onChange={handleChangeBrand}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em className="select-font">برندها</em>;
                                }

                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem dir='rtl' disabled value="">
                                <em>برندها</em>
                            </MenuItem>
                            {names.map((name) => (
                                <MenuItem
                                    dir='rtl'
                                    key={name}
                                    value={name}
                                >
                                    {/* {name} */}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <span className="error">{errors.details?.message}</span>
                    <div className="form-groups">
                        <textarea className="textarea-form" type="text" style={{ height: '200px' }} placeholder="مواد رو از چه کسی میگیری و چجوری تهیه میکنی ؟" {...register("details")}></textarea>
                    </div>
                    <div>
                        <button className="btn-form"><span className="btn-span-code">ثبت</span></button>
                    </div>
                </form>
            </Box>
        </FadeTransform>
    )
}

