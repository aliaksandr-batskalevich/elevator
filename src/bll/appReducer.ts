import {RootActionsType} from "./store";

export type AppActionsType = ReturnType<typeof setAppIsInit>
    | ReturnType<typeof setFormPart>;

export type FormPartType = 'firstPage' | 'secondPage';

type AppStateType = {
    isInit: boolean
    formPart: FormPartType
}

const appInitState: AppStateType = {
    isInit: false,
    formPart: 'firstPage',
}

export const appReducer = (state: AppStateType = appInitState, action: AppActionsType): AppStateType => {
    switch (action.type) {
        case 'SET_APP_IS_INIT':
            return {...state, ...action.payload};
        case 'SET_FORM_PART':
            return {...state, ...action.payload}
        default:
            return state;
    }
};

export const setAppIsInit = (isInit: boolean) => {
    return {
        type: 'SET_APP_IS_INIT',
        payload: {isInit}
    } as const;
};
export const setFormPart = (formPart: FormPartType) => {
    return {
        type: 'SET_FORM_PART',
        payload: {formPart}
    } as const;
};