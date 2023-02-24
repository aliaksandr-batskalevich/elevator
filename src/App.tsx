import React, {useEffect} from 'react';
import s from './App.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getIsAppInit} from "./bll/selectors";
import {Preloader} from "./components/commons/Preloader/Preloader";
import {House} from "./components/House/House";
import {setAppIsInit} from "./bll/appReducer";
import {initPeoplesOnFloors} from "./utilites/functions";
import {initPeopleOnFloors} from "./bll/floorsReducer";
import {Description} from "./components/Description/Description";

function App() {

    let isAppInit = useSelector(getIsAppInit);
    const dispatch = useDispatch();

    useEffect(() => {
        let peoplesOnFloors = initPeoplesOnFloors(9, 100);
        dispatch(initPeopleOnFloors(peoplesOnFloors));
        dispatch(setAppIsInit(true));
    }, [])

    return (
        <div className={s.appWrapper}>
            {isAppInit
                ? <div className={s.contentWrapper}>
                    <Description/>
                    <House/>
                </div>
                : <Preloader/>}
        </div>
    );
};

export default App;
