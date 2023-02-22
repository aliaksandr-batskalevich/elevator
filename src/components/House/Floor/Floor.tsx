import React from 'react';
import s from './Floor.module.scss';
import man from '../../../assets/images/man.webp';
import {CourseStopPointsType, FloorNumType} from "../../../bll/elevatorReducer";
import Elevator from "./Elevator/Elevator";
import {CallButton} from "./CallButton/CallButton";

type FloorPropsType = {
    floorNum: FloorNumType
    peopleCount: number
    currentElevatorFloor: FloorNumType
    currentUpStopPoints: CourseStopPointsType
    currentDownStopPoints: CourseStopPointsType

    elevatorUpCall: (floor: FloorNumType) => void
    elevatorDownCall: (floor: FloorNumType) => void
}

export const Floor: React.FC<FloorPropsType> = ({floorNum, peopleCount, currentElevatorFloor, elevatorUpCall, elevatorDownCall, currentUpStopPoints, currentDownStopPoints}) => {

    const elevatorUpCallHandler = () => {
        elevatorUpCall(floorNum);
    };
    const elevatorDownCallHandler = () => {
        elevatorDownCall(floorNum);
    };

    let isUpActive = currentUpStopPoints.some(floor => floor === floorNum);
    let isDownActive = currentDownStopPoints.some(floor => floor === floorNum);

    return (
        <div className={s.floorWrapper}>
            {floorNum === currentElevatorFloor && <Elevator peopleCount={peopleCount} />}
            <div className={s.panelInfoSelector}>
                <div className={s.floorNumWrapper}>
                    <div className={s.numWrapper}>{floorNum}</div>
                    <div className={s.floorText}>floor</div>
                </div>
                <div className={s.buttonWrapper}>
                    {floorNum !== 8 && <CallButton
                        isActive={isUpActive}
                        onClick={elevatorUpCallHandler}>⇧</CallButton>}
                    {floorNum !== 0 && <CallButton
                        isActive={isDownActive}
                        onClick={elevatorDownCallHandler}>⇩</CallButton>}
                </div>
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