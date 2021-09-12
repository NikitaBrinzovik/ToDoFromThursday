import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch:Dispatch<ErrorUtilsActionType>, message:string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch:Dispatch<ErrorUtilsActionType>, data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('eeeeeeeee'))
    }

    dispatch(setAppStatusAC('failed'))
}

export type ErrorUtilsActionType =
    | SetAppStatusActionType
    | SetAppErrorActionType
