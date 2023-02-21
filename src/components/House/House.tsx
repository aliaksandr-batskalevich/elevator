import React from 'react';
import s from './House.module.scss';
import {ElevatorShaft} from "./ElevatorShaft/ElevatorShaft";
import {v1} from "uuid";
import {Floor} from "./Floor/Floor";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentElevatorFloor, getPeoplesOnFloors} from "../../bll/selectors";
import {FloorNumType, setStopPoint} from "../../bll/elevatorReducer";

export const House = () => {

    let peoplesOnFloors = useSelector(getPeoplesOnFloors);
    let currentElevatorFloor = useSelector(getCurrentElevatorFloor);
    const dispatch = useDispatch();

    const elevatorCallHandler = (floor: FloorNumType, peoples: number) => {
        dispatch(setStopPoint(floor, peoples));
    };

    let floorsToRender = peoplesOnFloors.map((el, index) => <Floor
        key={v1()}
        floorNum={index as FloorNumType}
        peopleCount={el}
        currentElevatorFloor={currentElevatorFloor}
        elevatorCall={elevatorCallHandler}
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