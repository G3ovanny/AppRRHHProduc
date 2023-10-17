import { createSlice } from '@reduxjs/toolkit'

export const cedulaSlice = createSlice({
    name: 'cedula',
    initialState: {
        estadoCed: 'checking',
        trabCed: {},
        errorMessageCed: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.estadoCed = 'cheking';
            state.trabCed = {};
            state.errorMessageCed = undefined;
        },
        onlinkeding: (state, {payload}) => {
            state.estadoCed = 'linked';
            state.trabCed = payload;
            state.errorMessageCed = undefined;
        },
        onUnlinkeding: () =>{
            state.estadoCed = 'not-linked';
            state.trabCed = {};
            state.errorMessageCed = undefined;
        },
        clearErrorMessage:()=>{
            state.errorMessageCed=undefined;
        }
    }
})
export const {onChecking, onlinkeding, onUnlinkeding, clearErrorMessage}=cedulaSlice.actions