import axios from "axios";

let id ="803e05c5-af91-4a6c-a3c4-e4cc41b44488"
const instance = axios.create({
    baseURL:`https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {"api-key": "3f338418-f98d-49bd-8d21-8909cba70bac"}
})

export type TodoListType= {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodoListType
    }
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
/*type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}*/



/*const title = */
export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>('/todo-lists')
    },

    createTodo(title:string) {
        return instance.post<Array<CreateTodolistResponseType>>('/todo-lists', title)
    },

    deleteTodo(id:string) {
        return instance.delete<Array<DeleteTodolistResponseType>>(`todo-lists/${id}`)
    },

    updateTodo(id:string, title:string) {
        return instance.put<Array<DeleteTodolistResponseType>>(`todo-lists/${id}`,{title})
    },
}