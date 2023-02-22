import React from 'react';
import s from './House.module.scss';
import {ElevatorShaft} from "./ElevatorShaft/ElevatorShaft";
import {v1} from "uuid";
import {Floor} from "./Floor/Floor";
import {useDispatch, useSelector} from "react-redux";
import {
    getElevatorDownStopPoints,
    getCurrentElevatorFloor,
    getElevatorUpStopPoints,
    getPeoplesOnFloors
} from "../../bll/selectors";
import {FloorNumType, setDownStopPoint, setUpStopPoint} from "../../bll/elevatorReducer";

export const House = () => {

    let peoplesOnFloors = useSelector(getPeoplesOnFloors);
    let currentElevatorFloor = useSelector(getCurrentElevatorFloor);
    let currentUpStopPoints = useSelector(getElevatorUpStopPoints);
    let currentDownStopPoints = useSelector(getElevatorDownStopPoints);
    const dispatch = useDispatch();

    const elevatorUpCallHandler = (floor: FloorNumType) => {
        dispatch(setUpStopPoint(floor));
    };
    const elevatorDownCallHandler = (floor: FloorNumType) => {
        dispatch(setDownStopPoint(floor));
    };

    let floorsToRender = peoplesOnFloors.map((el, index) => <Floor
        key={v1()}
        floorNum={index as FloorNumType}
        peopleCount={el}
        currentElevatorFloor={currentElevatorFloor}
        currentUpStopPoints={currentUpStopPoints}
        currentDownStopPoints={currentDownStopPoints}

        elevatorUpCall={elevatorUpCallHandler}
        elevatorDownCall={elevatorDownCallHandler}
    />);



    return (
        <div className={s.houseWrapper}>
            <div className={s.shaftWrapper}>
                <ElevatorShaft/>
            </div>
            <div className={s.floorsWrapper}>
                {floorsToRender}
            </div>
        </div>
    );
};