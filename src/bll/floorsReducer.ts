type FloorsActionsType = ReturnType<typeof initPeopleOnFloors>;

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