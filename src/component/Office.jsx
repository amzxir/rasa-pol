import React, { useContext, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify'
import { FadeTransform } from "react-animation-components";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as yup from "yup";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Context from "../context/Context";
import axios from 'axios';
import BrandData from "../data/brands.json";


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
    common_treatment_center: yup.mixed().test("file", "فیلد درمان شایع مرکز اجباری است", (value) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    }),
    brand: yup.mixed().test("file", "فیلد برند اجباری است", (value) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    }),
    details: yup.string().required('فیلد سوال اجباری است'),
    matrial: yup.string().required('فیلد روش تهیه مواد مصرفی اجباری است'),
    buy: yup.string().required('فیلد شرایط خرید اجباری است'),
    buy_detals: yup.string().required('فیلد جزیات خرید اجباری است'),

});



export default function Office() {

    // start title 
    useEffect(() => {
        window.document.title = "رساپل - ثبت مطب"
    }, [])
    // end title 

    // start use context
    const { token } = useContext(Context)
    // end use context

    // start multip select 
    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
        const { target: { value } } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [brand, setBrand] = useState([]);
    const handleChangeBrand = (event) => {
        const { target: { value } } = event;
        setBrand(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    // end multip select  




    // start react hook form
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    // end react hook form

    // start function submit form
    const handleSubmits = async (data) => {

        const id = localStorage.getItem("user_id");

        const treatment = data.common_treatment_center;
        const stringTreatment = treatment.map((i) => `${i}`).join('-');
        const brand = data.brand;
        const stringBrand = brand.map((i) => `${i}`).join('-');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        const bodyParameters = {
            key: "value",
            title: 'مطب',
            name: data.name,
            type: "-",
            nature: "-",
            owner: "-",
            medical_system_no: data.system_number,
            license_no: "-",
            unit_count: "-",
            activ_hource: "-",
            shift_count: "-",
            expertise: "-",
            preparation: data.matrial,
            purchase_conditions: data.buy,
            cach_type: data.buy_detals,
            mobile: data.mobile,
            tell: data.phone,
            age: data.office_worker,
            common_treatment: stringTreatment,
            brands: stringBrand,
            description: data.details,
            user_id: id

        }

        try {
            const response = await axios.post('https://rasapol.reshe.ir/api/Create-present', bodyParameters, config);
            // console.log(response);
            if (response.data.status_code === 500) {
                toast.error('خطای سرور لطفا دقایقی بعد تلاش کنید')
            } else if (response.data.status_code === 422) {
                toast.error(response.data.msg)
            } else if (response.data.status_code === 200) {
                reset();
                setBrand([]);
                setPersonName([]);
                toast.success('ثبت مطب با موفقیت انجام شد')
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
                            <option value="سفارش اینترنتی از شرکت های وار کننده یا تولید کننده">سفارش اینترنتی از شرکت های وار کننده یا تولید کننده</option>
                            <option value="سفارش اینترنتی از شرکت های توزیع کننده">سفارش اینترنتی از شرکت های توزیع کننده</option>
                            <option value="شفارش از یک فروشنده">شفارش از یک فروشنده</option>
                            <option value="مراجعه حصوری به بازار">مراجعه حصوری به بازار</option>
                            <option value="خرید از نمایشگاه">خرید از نمایشگاه</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.buy?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("buy")}>
                            <option value=''>شرایط خرید را انتخاب کنید</option>
                            <option value="نقدی">نقدی</option>
                            <option value="شرایط">شرایط</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    {watch("buy") === "نقدی" ?
                        <>
                            <span className="error">{errors.buy_detals?.message}</span>
                            <div className="form-groups">
                                <select className="select-form" {...register("buy_detals")}>
                                    <option value=''>جزیات خرید را انتخاب کنید</option>
                                    <option value="پرداخت - ارسال">پرداخت - ارسال</option>
                                    <option value="ارسال - پرداخت">ارسال - پرداخت</option>
                                </select>
                                <ArrowDropDownIcon className="svg-form" fontSize='small' />
                            </div>
                        </>
                        : null}
                    {watch("buy") === "شرایط" ?
                        <>
                            <span className="error">{errors.buy_detals?.message}</span>
                            <div className="form-groups">
                                <input className="input-form" type="text" placeholder="شرایط را خلاصه وارد کنید" {...register("buy_detals")} />
                                <CreateIcon className="svg-form" fontSize='small' />
                            </div>
                        </>
                        : null}
                    <span className="error">{errors.common_treatment_center?.message}</span>
                    <div className="form-groups">
                        <Select
                            {...register("common_treatment_center")}
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
                    <span className="error">{errors.brand?.message}</span>
                    <div className="form-groups">
                        <Select
                            {...register("brand")}
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
                            {BrandData.map((i, index) => (
                                <MenuItem
                                    dir='rtl'
                                    key={i.id}
                                    value={i.name}
                                >
                                    {i.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* <div className="form-groups">
                        <select className="select-form" {...register("satisfaction")}>
                            <option value=''>میزان رضایت از تامین کننده را انتخاب کنید</option>
                            <option value="1">خیلی راضی</option>
                            <option value="1">راضی</option>
                            <option value="1">ناراضی</option>
                            <option value="1">شاکی</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div> */}
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

