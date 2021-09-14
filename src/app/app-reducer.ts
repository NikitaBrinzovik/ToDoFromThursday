import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-Reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
//status === loading - показываем крутилку
//status === 'idle' |  'succeeded' | 'failed' - hide крутилку
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    //error: "error text" as null | string
    isInitialized: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case "APP/SET/IS_INITIALIZED":
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            }
            //else {}
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}

//-------------AC---------
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET_ERROR', error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET/IS_INITIALIZED', isInitialized} as const)

//--------------types------
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType

