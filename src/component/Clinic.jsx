import React, { useContext, useEffect } from 'react'
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
const expertises = [
    'دندانپزشک عمومی',
    'متخصص ترمیمی',
    'متخصص درمان ریشه',
    'جراح فک و صورت',
    'جراحی لثه',
    'متخصص کودک',
    'متخصص ارتودنسی',
    'متخصص بیماری های دهان',
    'متخصص رادیولوژی',
];
const materials = [
    'سفارش اینترنتی از شرکت های وار کننده یا تولید کننده',
    'سفارش اینترنتی از شرکت های توزیع کننده',
    'سفارش از یک فروشنده',
    'مراجعه حضوری به بازار',
    'خرید از نمایشگاه',
];
// end data input select multip

// regex error validation
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{11}$/;

// validate form hook
const schema = yup.object().shape({
    mobile: yup.string().required('فیلد شماره موبایل اجباری است').matches(phoneRegExp, 'شماره موبایل را به درستی وارد کنید'),
    name_center: yup.string().required('فیلد نام مرکز اجباری است'),
    type_center: yup.string().required('فیلد نوع مرکز اجباری است'),
    nature_center: yup.string().required('فیلد ماهیت مرکز اجباری است'),
    name_founder: yup.string().required('فیلد نام موسس اجباری است'),
    number_units: yup.string().required('فیلد تعداد یونیت اجباری است'),
    // Number_active_units: yup.string().required('فیلد تعداد یونیت فعال اجباری است'),
    active_shift: yup.string().required('فیلد شیفت فعال اجباری است'),
    // Collaborator_name: yup.string().required('فیلد نام همکار پزشک اجباری است'),
    system_number: yup.string().required('فیلد شماره نظام پزشکی موسس اجباری است'),
    operation_license: yup.string().required('فیلد شماره پروانه بهره برداری اجباری است'),
    phone: yup.string().required('فیلد شماره ثابت اجباری است'),
    office_worker: yup.string().required('فیلد عمرفعال مطب اجباری است'),
    common_treatment_center: yup.mixed().test("file", "فیلد درمان های شایع مرکز اجباری است", (value) => {
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
    details: yup.string().required('فیلد سوال اجباری است').nullable(),
    date: yup.string().required('فیلد ساعت فعالیت اجباری است'),
    expertise: yup.mixed().test("file", "فیلد تخصص اجباری است", (value) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    }),
    buy: yup.string().required('فیلد شرایط خرید اجباری است'),
    buy_detals: yup.string().required('فیلد جزئیات خرید اجباری است'),
    matrial: yup.mixed().test("file", "فیلد روش تهیه مواد مصرفی اجباری است", (value) => {
        if (value.length > 0) {
            return true;
        }
        return false;
    }),
});



export default function Clinic() {
    // start title 
    useEffect(() => {
        window.document.title = "رساپل - ثبت کلینیک"
    }, [])
    // end title 

    // start use context
    const { token } = useContext(Context)
    // end use context

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

    const [expertise, setExpertise] = React.useState([]);
    const handleChangeExpertise = (event) => {
        const {
            target: { value },
        } = event;
        setExpertise(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [matrial, setMatrial] = React.useState([]);
    const handleChangeMatrial = (event) => {
        const {
            target: { value },
        } = event;
        setMatrial(
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
            title: 'کلینیک',
            name: data.name_center,
            type: data.type_center,
            nature: data.name_center,
            owner: data.name_founder,
            medical_system_no: data.system_number,
            license_no: data.operation_license,
            unit_count: data.number_units,
            activ_hource: data.date,
            shift_count: data.active_shift,
            expertise: data.expertise,
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
            const response = await axios.post('https://rasa-dash-pol.reshe.ir/api/Create-present', bodyParameters, config);
            // console.log(response);
            if (response.data.status_code === 500) {
                toast.error('خطای سرور لطفا دقایقی بعد تلاش کنید')
            } else if (response.data.status_code === 422) {
                toast.error(response.data.msg)
            } else if (response.data.status_code === 200) {
                reset();
                setBrand([]);
                setPersonName([]);
                setExpertise([]);
                setMatrial([]);
                toast.success('ثبت کلینیک با موفقیت انجام شد')
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
                    <span className="error">{errors.name_center?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام مرکز" {...register("name_center")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.type_center?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("type_center")}>
                            <option value=''>نوع مرکز را انتخاب کنید</option>
                            <option value="کلینیک عمومی دندانپزشکی">کلینیک عمومی دندانپزشکی</option>
                            <option value="کلینیک تخصصی دندانپزشکی">کلینیک تخصصی دندانپزشکی</option>
                            <option value="بیمارستان دندانپزشکی">بیمارستان دندانپزشکی</option>
                            <option value="بخش دندانپزشکی درمانگاه">بخش دندانپزشکی درمانگاه</option>
                            <option value="بخش بیمارستان دندانپزشکی">بخش بیمارستان دندانپزشکی</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.nature_center?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("nature_center")}>
                            <option value=''>ماهیت مرکز را انتخاب کنید</option>
                            <option value="دولتی">دولتی</option>
                            <option value="خصوصی">خصوصی</option>
                            <option value="عمومی غیر دولتی">عمومی غیر دولتی</option>
                            <option value="خیریه">خیریه</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.name_founder?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام موسس" {...register("name_founder")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.system_number?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره نظام پزشکی موسس" {...register("system_number")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.operation_license?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره پروانه بهره برداری" {...register("operation_license")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.number_units?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="تعداد یونیت" {...register("number_units")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.date?.message}</span>
                    <div className="form-groups">
                        <select className="select-form" {...register("date")}>
                            <option value=''>ساعت فعالیت را انتخاب کنید</option>
                            <option value="صبح">صبح</option>
                            <option value="عصر">عصر</option>
                            <option value="شبانه روزی">شبانه روزی</option>
                            <option value="صبح و عصر">صبح و عصر</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div>
                    {/* <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="تعداد یونیت فعال" {...register("Number_active_units")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.Number_active_units?.message}</span> */}
                    <span className="error">{errors.active_shift?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شیفت فعال" {...register("active_shift")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    {/* <span className="error">{errors.Collaborator_name?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="text" placeholder="نام همکار پزشک" {...register("Collaborator_name")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div> */}
                    <span className="error">{errors.expertise?.message}</span>
                    <div className="form-groups">
                        <Select
                            {...register("expertise")}
                            sx={{ pr: 0 }}
                            className="input-form"
                            multiple
                            displayEmpty
                            value={expertise}
                            onChange={handleChangeExpertise}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em className="select-font">متخصص های همکار در کلینیک را انتخاب کنید</em>;
                                }

                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem dir='rtl' disabled value="">
                                <em>متخصص های همکار در کلینیک را انتخاب کنید</em>
                            </MenuItem>
                            {expertises.map((name) => (
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
                    <span className="error">{errors.matrial?.message}</span>
                    <div className="form-groups">
                        <Select
                            {...register("matrial")}
                            sx={{ pr: 0 }}
                            className="input-form"
                            multiple
                            displayEmpty
                            value={matrial}
                            onChange={handleChangeMatrial}
                            input={<OutlinedInput />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em className="select-font">روش تهیه مواد مصرفی را انتخاب کنید</em>;
                                }

                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem dir='rtl' disabled value="">
                                <em>روش تهیه مواد مصرفی را انتخاب کنید</em>
                            </MenuItem>
                            {materials.map((name) => (
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
                                    <option value=''>جزئیات خرید را انتخاب کنید</option>
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
                    <span className="error">{errors.mobile?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره همراه کلینیک" {...register("mobile")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.phone?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="شماره ثابت کلینیک" {...register("phone")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
                    <span className="error">{errors.office_worker?.message}</span>
                    <div className="form-groups">
                        <input className="input-form" type="number" inputMode="numeric" placeholder="عمرفعال مطب" {...register("office_worker")} />
                        <CreateIcon className="svg-form" fontSize='small' />
                    </div>
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
                                    return <em className="select-font">درمان های شایع مرکز</em>;
                                }

                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem dir='rtl' disabled value="">
                                <em>درمان های شایع مرکز</em>
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
                                    return <em className="select-font">برندهای سایر مواد مصرفی شایع</em>;
                                }

                                return selected.join(', ');
                            }}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem dir='rtl' disabled value="">
                                <em>برندهای سایر مواد مصرفی شایع</em>
                            </MenuItem>
                            {BrandData.map((i, index) => (
                                <MenuItem
                                    dir='rtl'
                                    key={i.id}
                                    value={i.name}
                                    className="select-font"
                                >
                                    {i.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    {/* <div className="form-groups">
                        <select className="select-form" {...register("satisfaction")}>
                            <option value=''>میزان رضایت از تامین کننده را انتخاب کنید</option>
                            <option value="خیلی راضی">خیلی راضی</option>
                            <option value="راضی">راضی</option>
                            <option value="ناراضی">ناراضی</option>
                            <option value="شاکی">شاکی</option>
                        </select>
                        <ArrowDropDownIcon className="svg-form" fontSize='small' />
                    </div> */}
                    <span className="error">{errors.details?.message}</span>
                    <div className="form-groups">
                        <textarea className="textarea-form" type="text" style={{ height: '200px' }} placeholder="تامین کننده مواد مصرفی تون کیه ؟" {...register("details")}></textarea>
                    </div>
                    <div>
                        <button className="btn-form"><span className="btn-span-code">ثبت</span></button>
                    </div>
                </form>
            </Box>
        </FadeTransform>
    )
}

