import React from 'react';
import s from './Elevator.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getElevatorState} from "../../../../bll/selectors";
import {removeDownStopPoint, removeUpStopPoint, setElevatorStatus, setNextFloor} from "../../../../bll/elevatorReducer";
import {Form} from "./Form/Form";

type ElevatorPropsType = {
    peopleCount: number
}

const Elevator: React.FC<ElevatorPropsType> = ({peopleCount}) => {

    const {status, currentElevatorFloor, maxCapacity, currentCapacity, globalCourse, course, upStopPoints, downStopPoints} = useSelector(getElevatorState);
    const dispatch = useDispatch();

    const leaveFloorHandler = () => {
        if (globalCourse === 'up') {
            dispatch(removeUpStopPoint(currentElevatorFloor));
            dispatch(setNextFloor(undefined));
            dispatch(setElevatorStatus('move'));
        } else if (globalCourse === 'down') {
            dispatch(removeDownStopPoint(currentElevatorFloor));
            dispatch(setNextFloor(undefined));
            dispatch(setElevatorStatus('move'));
        }
    };

    return (
        <div className={s.elevatorWrapper}>
            <div className={s.capacity}>
                {`${currentCapacity}/${maxCapacity} peoples`}
            </div>
            <div className={s.course}>
                {course === 'up'
                    ? '▲'
                    : course === 'down'
                        ? '▼'
                        : '---'}
            </div>

            {status === 'stop' && <div className={s.formWrapper}>
                <Form
                    maxCapacity={maxCapacity}
                    currentCapacity={currentCapacity}
                    currentElevatorFloor={currentElevatorFloor}
                    globalCourse={globalCourse}
                    peopleCount={peopleCount}
                    leaveFloor={leaveFloorHandler}
                />
            </div>}

            {/*<div>{JSON.stringify(upStopPoints)}</div>*/}
            {/*<div>{JSON.stringify(downStopPoints)}</div>*/}
        </div>
    );
};

export default React.memo(Elevator);
