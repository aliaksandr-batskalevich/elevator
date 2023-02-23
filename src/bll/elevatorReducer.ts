export type ElevatorActionsType = ReturnType<typeof setElevatorStatus>
    | ReturnType<typeof setCurrentFloor>
    | ReturnType<typeof setNextFloor>
    | ReturnType<typeof setCurrentCapacity>
    | ReturnType<typeof setGlobalCourse>
    | ReturnType<typeof setCourse>
    | ReturnType<typeof setUpStopPoint>
    | ReturnType<typeof setUpStopPointsArr>
    | ReturnType<typeof setDownStopPoint>
    | ReturnType<typeof setDownStopPointsArr>
    | ReturnType<typeof removeUpStopPoint>
    | ReturnType<typeof removeDownStopPoint>;

export type FloorNumType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CourseType = 'up' | 'down' | undefined;
export type CourseStopPointsType = Array<FloorNumType>;
export type ElevatorStatusType = 'wait' | 'move' | 'stop';

export type ElevatorStateType = {
    timeToFloorMs: number
    status: ElevatorStatusType
    currentElevatorFloor: FloorNumType
    nextElevatorFloor: undefined | FloorNumType
    maxCapacity: number
    currentCapacity: number
    globalCourse: CourseType
    course: CourseType
    upStopPoints: CourseStopPointsType
    downStopPoints: CourseStopPointsType
}

const elevatorInitState: ElevatorStateType = {
    timeToFloorMs: 500,
    status: 'wait',
    currentElevatorFloor: 0,
    nextElevatorFloor: undefined,
    maxCapacity: 6,
    currentCapacity: 0,
    globalCourse: undefined,
    course: undefined,
    upStopPoints: [],
    downStopPoints: [],
}

export const elevatorReducer = (state: ElevatorStateType = elevatorInitState, action: ElevatorActionsType): ElevatorStateType => {
    switch (action.type) {
        case 'SET_ELEVATOR_STATUS':
            return {...state, ...action.payload};
        case 'SET_CURRENT_FLOOR':
            return {...state, ...action.payload};
        case 'SET_NEXT_FLOOR':
            return {...state, ...action.payload};
        case 'SET_CURRENT_CAPACITY':
            return {...state, ...action.payload};
        case 'SET_GLOBAL_COURSE':
            return {...state, ...action.payload};
        case 'SET_COURSE':
            return {...state, ...action.payload};
        case 'SET_UP_STOP_POINT':
            return {...state, upStopPoints: [...state.upStopPoints, action.payload.floor].sort((a, b) => a - b)};
        case 'SET_UP_STOP_POINTS_ARR':
            return {...state, upStopPoints: [...state.upStopPoints, ...action.payload.array].sort((a, b) => a - b)};
        case 'SET_DOWN_STOP_POINT':
            return {...state, downStopPoints: [...state.downStopPoints, action.payload.floor].sort((a, b) => b - a)};
        case 'SET_DOWN_STOP_POINTS_ARR':
            return {...state, downStopPoints: [...state.downStopPoints, ...action.payload.array].sort((a, b) => b - a)};
        case 'REMOVE_UP_STOP_POINT':
            return {...state, upStopPoints: state.upStopPoints.filter(floor => floor !== action.payload.floor)};
        case 'REMOVE_DOWN_STOP_POINT':
            return {...state, downStopPoints: state.downStopPoints.filter(floor => floor !== action.payload.floor)};
        default:
            return state;
    }
};

export const setElevatorStatus = (status: ElevatorStatusType) => {
    return {
        type: 'SET_ELEVATOR_STATUS',
        payload: {status}
    } as const;
};
export const setCurrentFloor = (currentElevatorFloor: FloorNumType) => {
    return {
        type: 'SET_CURRENT_FLOOR',
        payload: {currentElevatorFloor}
    } as const;
};
export const setNextFloor = (nextElevatorFloor: FloorNumType | undefined) => {
    return {
        type: 'SET_NEXT_FLOOR',
        payload: {nextElevatorFloor}
    } as const;
};
export const setCurrentCapacity = (currentCapacity: number) => {
    return {
        type: 'SET_CURRENT_CAPACITY',
        payload: {currentCapacity},
    } as const;
};
export const setGlobalCourse = (globalCourse: CourseType) => {
    return {
        type: 'SET_GLOBAL_COURSE',
        payload: {globalCourse}
    } as const;
};
export const setCourse = (course: CourseType) => {
    return {
        type: 'SET_COURSE',
        payload: {course}
    } as const;
};
export const setUpStopPoint = (floor: FloorNumType) => {
    return {
        type: 'SET_UP_STOP_POINT',
        payload: {floor}
    } as const;
};
export const setUpStopPointsArr = (array: CourseStopPointsType) => {
    return {
        type: 'SET_UP_STOP_POINTS_ARR',
        payload: {array}
    } as const;
};
export const setDownStopPoint = (floor: FloorNumType) => {
    return {
        type: 'SET_DOWN_STOP_POINT',
        payload: {floor}
    } as const;
};
export const setDownStopPointsArr = (array: CourseStopPointsType) => {
    return {
        type: 'SET_DOWN_STOP_POINTS_ARR',
        payload: {array}
    } as const;
};
export const removeUpStopPoint = (floor: FloorNumType) => {
    return {
        type: 'REMOVE_UP_STOP_POINT',
        payload: {floor}
    } as const;
};
export const removeDownStopPoint = (floor: FloorNumType) => {
    return {
        type: 'REMOVE_DOWN_STOP_POINT',
        payload: {floor}
    } as const;
};

