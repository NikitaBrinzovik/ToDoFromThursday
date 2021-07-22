import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolist-api";

export default {
    title: 'API'
}



export const GetTodolistsExample = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => {
            setState((res.data[0].id))
        })
        /*
         // здесь мы будем делать запрос и ответ закидывать в стейт.
         let promise = axios.get(baseURL, {
             withCredentials: true
         })
         promise.then((response) => {// response- это ответ от axios
             setState(response.data);// data- это ответ от разработчика бека
         })
         // который в виде строки будем отображать в div-ке*/

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolistExample = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "hello"
        todolistAPI.createTodo(title)
            .then((res) => {
                setState(res.data)
            })

        /*let promise = axios.post(baseURL,
            {title: "AXIOS"},
            {
                withCredentials: true,
                headers: {"api-key": "3f338418-f98d-49bd-8d21-8909cba70bac"}
            })
        promise.then((response) => {
            setState(response.data)
        })
            .catch((err) => {
            })*/
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodlistExample = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "803e05c5-af91-4a6c-a3c4-e4cc41b44488"
        todolistAPI.deleteTodo(id)
            .then((res) => {
            setState(res.data)
        })
        /*let promise = axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${"6c9e3a27-0c2a-4820-ae30-6bea2a31929e"}`,
            {
                withCredentials: true,
                headers: {"api-key": "3f338418-f98d-49bd-8d21-8909cba70bac"}
            })
        promise.then((res) => {
            //setState(res.data);
        })*/

    }, [])

    return <div> {JSON.stringify(state)}</div>//преобразует объект в json строку
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "803e05c5-af91-4a6c-a3c4-e4cc41b44488";
        const title = "hello"
        todolistAPI.updateTodo(id, title)
            .then((res) => {
            setState((res.data))
        })

        /*let promise = axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${"803e05c5-af91-4a6c-a3c4-e4cc41b44488"}`,
            {title: 'REACT'},
            {
                withCredentials: true,
                headers: {"api-key": "3f338418-f98d-49bd-8d21-8909cba70bac"}
            })
        promise.then((res) => {
            setState(res.data)
        })*/

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
