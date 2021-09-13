import React from 'react'
//переписать все импорты грамматно: из библиотек тянуть только нужные файлы
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";

export const Login = () => {

    // lib FORMIK
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null,2))
        }
    })




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
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            //для формика:
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                //для формика:
                                name="rememberMe"
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />}

                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </form>

            </FormControl>
        </Grid>
    </Grid>
}
