import {RootStateType} from "./store";
import {CourseStopPointsType, ElevatorStateType, FloorNumType} from "./elevatorReducer";
import {createSelector} from "reselect";
import {FormPartType} from "./appReducer";

// app
export const getIsAppInit = (state: RootStateType): boolean => state.app.isInit;
export const getFormPart = (state: RootStateType): FormPartType => state.app.formPart;

// elevator
export const getElevatorState = (state: RootStateType): ElevatorStateType => state.elevator;
export const getCurrentElevatorFloor = (state: RootStateType): FloorNumType => state.elevator.currentElevatorFloor;
export const getElevatorUpStopPoints = (state: RootStateType): CourseStopPointsType => state.elevator.upStopPoints;
export const getElevatorDownStopPoints = (state: RootStateType): CourseStopPointsType => state.elevator.downStopPoints;

export const getElevatorCurrentUpStopPoints = createSelector(getElevatorUpStopPoints, getCurrentElevatorFloor, (elevatorUpStopPoints: CourseStopPointsType, currentElevatorFloor: FloorNumType): CourseStopPointsType => elevatorUpStopPoints.filter(floor => floor >= currentElevatorFloor));

export const getElevatorCurrentDownStopPoints = createSelector(getElevatorDownStopPoints, getCurrentElevatorFloor, (elevatorUpStopPoints: CourseStopPointsType, currentElevatorFloor: FloorNumType): CourseStopPointsType => elevatorUpStopPoints.filter(floor => floor <= currentElevatorFloor));

// floors
export const getPeoplesOnFloors = (state: RootStateType): Array<number> => state.floors.peoplesOnFloors;