import {FloorNumType} from "./elevatorReducer";

type FloorsActionsType = ReturnType<typeof initPeopleOnFloors>
    | ReturnType<typeof addPeoplesNumOnFloor>
    | ReturnType<typeof remPeoplesNumOnFloor>;

type FloorsStateType = {
    peoplesOnFloors: Array<number>
};

const floorsInitState: FloorsStateType = {
    peoplesOnFloors: [],
};

export const floorsReducer = (state: FloorsStateType = floorsInitState, action: FloorsActionsType) => {
    switch (action.type) {
        case 'INIT_PEOPLE_ON_FLOORS':
            return {...state, ...action.payload};
        case 'ADD_PEOPLES_NIM_ON_FLOOR':
            return {...state, peoplesOnFloors: state.peoplesOnFloors.map((p, f) => f === action.payload.floor ? p + action.payload.count : p)};
        case 'REM_PEOPLES_NIM_ON_FLOOR':
            return {...state, peoplesOnFloors: state.peoplesOnFloors.map((p, f) => f === action.payload.floor ? p - action.payload.count : p)};
        default:
            return state;
    }
};

export const initPeopleOnFloors = (peoplesOnFloors: Array<number>) => {
    return {
        type: 'INIT_PEOPLE_ON_FLOORS',
        payload: {peoplesOnFloors}
    } as const;
};
export const addPeoplesNumOnFloor = (floor: FloorNumType, count: number) => {
    return {
        type: 'ADD_PEOPLES_NIM_ON_FLOOR',
        payload: {floor, count}
    } as const;
};
export const remPeoplesNumOnFloor = (floor: FloorNumType, count: number) => {
    return {
        type: 'REM_PEOPLES_NIM_ON_FLOOR',
        payload: {floor, count}
    } as const;
};