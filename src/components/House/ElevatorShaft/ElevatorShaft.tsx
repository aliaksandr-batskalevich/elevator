import React, {useEffect} from 'react';
import s from './ElevatorShaft.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {
    getElevatorCurrentDownStopPoints,
    getElevatorCurrentUpStopPoints,
    getElevatorState
} from "../../../bll/selectors";
import {
    FloorNumType,
    setGlobalCourse,
    setCurrentFloor,
    setElevatorStatus,
    setNextFloor,
    setCourse
} from "../../../bll/elevatorReducer";

export const ElevatorShaft = () => {
    const dispatch = useDispatch();

    let {
        status,
        nextElevatorFloor,
        globalCourse,
        timeToFloorMs,
        currentElevatorFloor,
        upStopPoints,
        downStopPoints
    } = useSelector(getElevatorState);

    let currentUpStopPoints = useSelector(getElevatorCurrentUpStopPoints);
    let currentDownStopPoints = useSelector(getElevatorCurrentDownStopPoints);

    // useEffect for create nextElevatorFloor
    useEffect(() => {

        // set waitStatus
        if (status !== 'wait' && !upStopPoints.length && !downStopPoints.length) {
            dispatch(setGlobalCourse(undefined));
            dispatch(setElevatorStatus('wait'));
            dispatch(setNextFloor(undefined));
        }

        // move from waitStatus
        if (status === 'wait') {
            if (upStopPoints.length) {
                dispatch(setGlobalCourse('up'));
                dispatch(setElevatorStatus('move'));
                dispatch(setNextFloor(upStopPoints[0]));
            } else if (downStopPoints.length) {
                dispatch(setGlobalCourse('down'));
                dispatch(setElevatorStatus('move'));
                dispatch(setNextFloor(downStopPoints[0]));
            }
        }

        // moves
        if (status === 'move' && !nextElevatorFloor) {

            // move UP
            if (globalCourse === 'up') {
                if (currentUpStopPoints.length) {
                    dispatch(setNextFloor(currentUpStopPoints[0]));
                } else if (!currentUpStopPoints.length && downStopPoints.length) {
                    dispatch(setGlobalCourse('down'));
                    dispatch(setNextFloor(downStopPoints[0]));
                } else if (!currentUpStopPoints.length && !downStopPoints.length && upStopPoints.length) {
                    dispatch(setNextFloor(upStopPoints[0]));
                }
            }

            //move DOWN
            if (globalCourse === 'down') {
                if (currentDownStopPoints.length) {
                    dispatch(setNextFloor(currentDownStopPoints[0]));
                } else if (!currentDownStopPoints.length && upStopPoints.length) {
                    dispatch(setGlobalCourse('up'));
                    dispatch(setNextFloor(upStopPoints[0]));
                } else if (!currentDownStopPoints.length && !upStopPoints.length && downStopPoints.length) {
                    dispatch(setNextFloor(downStopPoints[0]));
                }
            }

        }
    }, [currentUpStopPoints, currentDownStopPoints, upStopPoints, downStopPoints, status]);


    // useEffect for elevatorMoves
    useEffect(() => {
        if (nextElevatorFloor !== undefined) {

            // stop elevator
            if (currentElevatorFloor === nextElevatorFloor) {
                dispatch(setElevatorStatus('stop'));
                dispatch(setCourse(undefined));
            }

            // move elevator UP
            else if (currentElevatorFloor < nextElevatorFloor) {
                let timeOutId = setTimeout(() => {
                    dispatch(setCourse('up'));
                    dispatch(setCurrentFloor(currentElevatorFloor + 1 as FloorNumType));
                }, timeToFloorMs);
                return () => {
                    clearTimeout(timeOutId);
                }
            }

            // move elevator DOWN
            else if (currentElevatorFloor > nextElevatorFloor) {
                let timeOutId = setTimeout(() => {
                    dispatch(setCourse('down'));
                    dispatch(setCurrentFloor(currentElevatorFloor - 1 as FloorNumType));
                }, timeToFloorMs);
                return () => {
                    clearTimeout(timeOutId);
                }
            }
        }

    }, [currentElevatorFloor, nextElevatorFloor]);


    return (
        <div className={s.elevatorShaftWrapper}>

        </div>
    );
};
