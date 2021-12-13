import React, {useEffect} from 'react'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-Reducer";

function App() {
    //1 аргумент у useSelector-всегда state всего приложения, вторым- что возвращ этот хук
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <AppBar position="static">

                {status === "loading" && <LinearProgress color={"secondary"}/>}

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Hello!
                    </Typography>

                    {/*если залогинен, то кнопка рвзлог*/}
                    {isLoggedIn &&
                    <Button color="inherit" onClick={logoutHandler}>Logout</Button>}

                </Toolbar>

                <ErrorSnackbar/>
            </AppBar>
            <Container fixed>
                <Switch>

                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() =>
                        <h1 style={{'textAlign': 'center', 'fontSize': '50px'}}>404 page
                            not found</h1>}/>

                    {/*<Redirect to={'/404'} from={'*'}/>*/}
                </Switch>

            </Container>
        </div>
    )
}

export default App
