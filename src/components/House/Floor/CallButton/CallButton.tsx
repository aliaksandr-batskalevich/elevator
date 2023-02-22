import React from 'react';
import s from './CallButton.module.scss';

type CallButtonPropsType = {
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

export const CallButton: React.FC<CallButtonPropsType> = ({isActive, onClick, children}) => {

    let rootClassName = isActive ? `${s.buttonWrapper} ${s.active}` : `${s.buttonWrapper} ${s.default}`;

    return (
        <div
            className={rootClassName}
            onClick={onClick}
        >
            {children}
        </div>
    );
};