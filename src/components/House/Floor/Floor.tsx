import React from 'react';
import s from './Floor.module.scss';
import man from '../../../assets/images/man.webp';
import {FloorNumType} from "../../../bll/elevatorReducer";
import {Elevator} from "./Elevator/Elevator";

type FloorPropsType = {
    floorNum: FloorNumType
    peopleCount: number
    currentElevatorFloor: FloorNumType
    elevatorCall: (floor: FloorNumType, peoples: number) => void
}

export const Floor: React.FC<FloorPropsType> = ({floorNum, peopleCount, currentElevatorFloor, elevatorCall}) => {

    const elevatorCallHandler = () => {
        elevatorCall(floorNum, 3);
    };

    return (
        <div className={s.floorWrapper}>
            {floorNum === currentElevatorFloor && <Elevator />}
            <div className={s.floorNumWrapper}>
                <div className={s.numWrapper} onClick={elevatorCallHandler}>{floorNum}</div>
                <div className={s.floorText}>floor</div>
            </div>
            {
                !!peopleCount && <div className={s.peoples}>
                    <div><img src={man} alt="man"/></div>
                    <div className={s.peopleCount}>{peopleCount}</div>
                </div>
            }
        </div>
    );
};