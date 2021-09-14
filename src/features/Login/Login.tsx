import React from 'react'
//переписать все импорты грамматно: из библиотек тянуть только нужные файлы
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-Reducer";
import {AppRootStateType} from '../../app/store';
import {Redirect} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    // lib FORMIK
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Введите пароль. Обязательное поле';
            } else if (values.password.length < 3) {
                errors.password = 'Пароль должен быть больше 3 символов';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            //alert(JSON.stringify(values, null,2))
            formik.resetForm();// зачистить поля после подтверждения формы
        }
    })

    //проверка на залогиненость и возможный редирект
    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }


    //lib material-ui
    return <Grid container justify="center">
        <Grid item xs={4}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}>here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>

                {/*оборачиваем обычным тегом форм, чтоб подвязать с формиком*/}
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"

                            //для формика:
                            type="email"

                            /*этот код заменим на короткую запись - см 6строчек ниже
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            //доп для валидации
                            onBlur={formik.handleBlur}*/
                            {...formik.getFieldProps('email')}
                        />
                        {/*VALIDATION: если поле тронутое, но ввод не закончен & если невалидный ввод*/}
                        {formik.touched.email && formik.errors.email &&
                        <div style={{"color": "red"}}>{formik.errors.email}</div>}

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"

                            /*этот код заменим на короткую запись- см 7строчек ниже
                            //для формика:
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            //доп для валидации
                            onBlur={formik.handleBlur}*/
                            {...formik.getFieldProps('password')}
                        />
                        {/*VALIDATION*/}
                        {formik.touched.password && formik.errors.password &&
                        <div style={{"color": "red"}}>{formik.errors.password}</div>}


                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </form>

            </FormControl>
        </Grid>
    </Grid>
}

//---------TYPES------------
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
