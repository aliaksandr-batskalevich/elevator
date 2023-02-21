import {RootStateType} from "./store";
import {CourseStopPointsType, CourseType, ElevatorStateType, FloorNumType} from "./elevatorReducer";
import {createSelector} from "reselect";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isInit;

// elevator
export const getElevatorState = (state: RootStateType): ElevatorStateType => state.elevator;
export const getCurrentElevatorFloor = (state: RootStateType): FloorNumType => state.elevator.currentElevatorFloor;
const getCurrentStopPoints = (state: RootStateType): CourseStopPointsType => state.elevator.currentStopPoints;
const getCourse = (state: RootStateType): CourseType => state.elevator.course;
export const getCurrentStopPointsToMove = createSelector(getCurrentStopPoints, getCourse, (currentStopPoints: CourseStopPointsType, course: CourseType): Array<FloorNumType> => Object.keys(currentStopPoints).map(el => +el as FloorNumType).sort((a, b) => course === 'down' ? b - a : a - b));

// floors
export const getPeoplesOnFloors = (state: RootStateType): Array<number> => state.floors.peoplesOnFloors;