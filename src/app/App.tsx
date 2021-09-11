import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useSelector} from 'react-redux'
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {
    //1 аргумент у useSelector-всегда state всего приложения, вторым- что возвращ этот хук
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">

                {/*если лоадинг, то крутилка*/}
                {status === "loading" && <LinearProgress color={"secondary"}/>}

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Hello!
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>

                <ErrorSnackbar/>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App
