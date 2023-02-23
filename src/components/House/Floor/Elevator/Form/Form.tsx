import React, {ChangeEvent} from 'react';
import s from './Form.module.scss';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    getElevatorCurrentDownStopPoints,
    getElevatorCurrentUpStopPoints,
    getFormPart
} from "../../../../../bll/selectors";
import {setFormPart} from "../../../../../bll/appReducer";
import {
    CourseStopPointsType,
    CourseType,
    FloorNumType,
    setCurrentCapacity,
    setDownStopPointsArr,
    setUpStopPointsArr
} from "../../../../../bll/elevatorReducer";
import {addPeoplesNumOnFloor, remPeoplesNumOnFloor} from "../../../../../bll/floorsReducer";
import {v1} from "uuid";

type FormPropsType = {
    maxCapacity: number
    currentCapacity: number
    currentElevatorFloor: FloorNumType
    globalCourse: CourseType
    peopleCount: number

    leaveFloor: () => void
};


export const Form: React.FC<FormPropsType> = ({
                                                  maxCapacity,
                                                  currentCapacity,
                                                  currentElevatorFloor,
                                                  globalCourse,
                                                  peopleCount,
                                                  leaveFloor
                                              }) => {

    let formPart = useSelector(getFormPart);
    let elevatorCurrentUpStopPoints = useSelector(getElevatorCurrentUpStopPoints);
    let elevatorCurrentDownStopPoints = useSelector(getElevatorCurrentDownStopPoints);

    const dispatch = useDispatch();

    const peopleBalanceHandler = (num: number, course: 'in' | 'out') => {
        if (course === 'out') {
            dispatch(setCurrentCapacity(currentCapacity - num));
            dispatch(addPeoplesNumOnFloor(currentElevatorFloor, num));
        } else {
            dispatch(setCurrentCapacity(currentCapacity + num));
            dispatch(remPeoplesNumOnFloor(currentElevatorFloor, num));
        }
    };

    const formik = useFormik({
        initialValues: {
            leavePeople: 0,
            incomingPeople: 0,
            checkedFloors: [] as Array<string>,
        },
        onSubmit(values) {
            let checkedFloorsNum = values.checkedFloors.map(floor => +floor) as CourseStopPointsType;
            peopleBalanceHandler(values.incomingPeople, 'in');
            dispatch(setFormPart('firstPage'));
            globalCourse === 'up'
                ? dispatch(setUpStopPointsArr(checkedFloorsNum))
                : dispatch(setDownStopPointsArr(checkedFloorsNum));
            leaveFloor();
            // alert(JSON.stringify(values));
        },
    });

    const inputLeaveHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        +event.currentTarget.value >= 0
        && +event.currentTarget.value <= currentCapacity
        && formik.handleChange(event);
    };
    const inputIncomingHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
        +event.currentTarget.value >= 0
        && +event.currentTarget.value <= peopleCount
        && +event.currentTarget.value + currentCapacity <= maxCapacity
        && formik.handleChange(event);
    };

    const setSecondPartHandler = () => {
        dispatch(setFormPart('secondPage'));
        formik.values.leavePeople && peopleBalanceHandler(formik.values.leavePeople, 'out');
    };
    const messageButtonOnclickHandler = () => {
        leaveFloor();
        dispatch(setFormPart('firstPage'));
    };


    let buttonTitle = !formik.values.leavePeople ? 'No one' : 'Go';

    let checkboxToRender = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(el => {
        let isChecked = formik.values.checkedFloors.includes(String(el))
            || (globalCourse === 'up'
                ? elevatorCurrentUpStopPoints.includes(el as FloorNumType)
                : elevatorCurrentDownStopPoints.includes(el as FloorNumType));

        let isCheckboxDisabled = isChecked || (globalCourse === 'up'
            ? el < elevatorCurrentUpStopPoints[0]
            : el > elevatorCurrentDownStopPoints[0]);

        return <div className={s.checkbox}>
            <input
                key={v1()}
                type="checkbox"
                id={`${el}`}
                name='checkedFloors'
                onChange={formik.handleChange}
                value={el}
                checked={isChecked}
                disabled={isCheckboxDisabled}
            />
            <label htmlFor={`${el}`}>{el}</label>
        </div>
    });

    return (

        <form className={s.formWrapper} onSubmit={formik.handleSubmit}>
            {formPart === 'firstPage'
            && (currentCapacity
                ? <div className={s.firstPart}>
                    <label htmlFor="leavePeople">How many people go out?</label>
                    <div className={s.inputButtonWrapper}>
                        <input
                            type='number'
                            id='leavePeople'
                            name='leavePeople'
                            onChange={inputLeaveHandleChange}
                            value={formik.values.leavePeople}
                            onBlur={formik.handleBlur}
                        />
                        <button
                            type='button'
                            onClick={setSecondPartHandler}
                        >{buttonTitle}</button>
                    </div>
                </div>
                : <div className={s.message}>
                    <p>The elevator is empty, it can fit 6 people.</p>
                    <button type='button' onClick={setSecondPartHandler}>Continue</button>
                </div>)}
            {formPart === 'secondPage'
            && (maxCapacity !== currentCapacity
                ? <div className={s.secondPart}>
                    <label htmlFor="leavePeople">Incoming people</label>
                    <input
                        className={s.peoplesNum}
                        type='number'
                        id='incomingPeople'
                        name='incomingPeople'
                        onChange={inputIncomingHandleChange}
                        value={formik.values.incomingPeople}
                        onBlur={formik.handleBlur}
                    />

                    <p className={s.lastAsk}>Which floors?</p>
                    <div className={s.checkboxWrapper}>
                        {checkboxToRender}
                    </div>

                    <div className={s.buttonWrapper}>
                        <button type='submit'>Close the doors</button>
                    </div>
                </div>
                : <div className={s.message}>
                    <p>Sorry, the elevator is full, try calling the next one.</p>
                    <button type='button' onClick={messageButtonOnclickHandler}>Close the doors</button>
                </div>)}
        </form>

    );
};