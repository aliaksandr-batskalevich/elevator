export type ElevatorActionsType = ReturnType<typeof setCurrentFloor>
    | ReturnType<typeof setCurrentCapacity>
    | ReturnType<typeof setCourse>
    | ReturnType<typeof setStopPoint>
    | ReturnType<typeof removeStopPoint>;

export type FloorNumType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CourseType = 'up' | 'down' | undefined;
export type CourseStopPointsType = Record<string, number>;

export type ElevatorStateType = {
    timeToFloorMs: number
    currentElevatorFloor: FloorNumType
    maxCapacity: number
    currentCapacity: number
    course: CourseType
    currentStopPoints: CourseStopPointsType
    backStopPoints: Array<FloorNumType>
}

const elevatorInitState: ElevatorStateType = {
    timeToFloorMs: 500,
    currentElevatorFloor: 0,
    maxCapacity: 6,
    currentCapacity: 0,
    course: undefined,
    currentStopPoints: {},
    backStopPoints: [],
}

export const elevatorReducer = (state: ElevatorStateType = elevatorInitState, action: ElevatorActionsType): ElevatorStateType => {
    switch (action.type) {
        case 'SET_CURRENT_FLOOR':
            return {...state, ...action.payload};
        case 'SET_CURRENT_CAPACITY':
            return {...state, ...action.payload};
        case 'SET_COURSE':
            return {...state, ...action.payload};
        case 'SET_STOP_POINT':
            // return {...state, currentStopPoints: {...state.currentStopPoints, [action.payload.floor]: action.payload.peoples}};
            return {...state, currentStopPoints: {[action.payload.floor]: action.payload.peoples}};
        case 'REMOVE_STOP_POINT':
            let newCurrentStopPoints = {...state.currentStopPoints};
            delete newCurrentStopPoints[action.payload.floor];
            return {...state, currentStopPoints: newCurrentStopPoints};
        default:
            return state;
    }
};

export const setCurrentFloor = (currentElevatorFloor: FloorNumType) => {
    return {
        type: 'SET_CURRENT_FLOOR',
        payload: {currentElevatorFloor}
    } as const;
};
export const setCurrentCapacity = (currentCapacity: number) => {
    return {
        type: 'SET_CURRENT_CAPACITY',
        payload: {currentCapacity},
    } as const;
};
export const setCourse = (course: CourseType) => {
    return {
        type: 'SET_COURSE',
        payload: {course}
    } as const;
};
export const setStopPoint = (floor: FloorNumType, peoples: number) => {
    return {
        type: 'SET_STOP_POINT',
        payload: {floor, peoples}
    } as const;
};
export const removeStopPoint = (floor: FloorNumType) => {
    return {
        type: 'REMOVE_STOP_POINT',
        payload: {floor}
    } as const;
};

