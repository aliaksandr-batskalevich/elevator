import React, {useEffect} from 'react';
import s from './ElevatorShaft.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentStopPointsToMove, getElevatorState} from "../../../bll/selectors";
import {CourseType, FloorNumType, removeStopPoint, setCourse, setCurrentFloor} from "../../../bll/elevatorReducer";

export const ElevatorShaft = () => {
    const dispatch = useDispatch();
    let {course,currentElevatorFloor, timeToFloorMs} = useSelector(getElevatorState);
    let currentStopPoints = useSelector(getCurrentStopPointsToMove);


    // useEffect for elevatorMove
    useEffect(() => {
        if (currentElevatorFloor !== currentStopPoints[0] && currentStopPoints.length) {
            let timeOutId = setTimeout(() => {

                let currentCourse: CourseType = currentElevatorFloor < currentStopPoints[0] ? 'up' : 'down';
                currentCourse !== course && dispatch(setCourse(currentCourse));
                dispatch(setCurrentFloor(currentElevatorFloor + (currentCourse === 'up' ? 1 : -1) as FloorNumType));

            }, timeToFloorMs);
            return () => {
                clearTimeout(timeOutId);
            };
        }
    }, [currentElevatorFloor, currentStopPoints]);





    return (
        <div className={s.elevatorShaftWrapper}>

        </div>
    );
};
