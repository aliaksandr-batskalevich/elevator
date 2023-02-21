import {RootActionsType} from "./store";

export type AppActionsType = ReturnType<typeof setAppIsInit>;

type AppStateType = {
    isInit: boolean
}

const appInitState: AppStateType = {
    isInit: false,
}

export const appReducer = (state: AppStateType = appInitState, action: RootActionsType): AppStateType => {
    switch (action.type) {
        case 'SET_APP_IS_INIT':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

export const setAppIsInit = (isInit: boolean) => {
    return {
        type: 'SET_APP_IS_INIT',
        payload: {isInit}
    }
};