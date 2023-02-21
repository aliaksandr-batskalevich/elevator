import React from 'react';
import s from './Elevator.module.scss';
import {useSelector} from "react-redux";
import {getElevatorState} from "../../../../bll/selectors";

export const Elevator = () => {
    const {maxCapacity, currentCapacity, course, currentStopPoints} = useSelector(getElevatorState);

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
            <div>{JSON.stringify(currentStopPoints)}</div>
        </div>
    );
};
