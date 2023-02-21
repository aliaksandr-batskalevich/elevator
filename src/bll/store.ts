import {combineReducers, legacy_createStore} from "redux";
import {AppActionsType, appReducer} from "./appReducer";
import {ElevatorActionsType, elevatorReducer} from "./elevatorReducer";
import {floorsReducer} from "./floorsReducer";

const rootReducer = combineReducers({
    app: appReducer,
    elevator: elevatorReducer,
    floors: floorsReducer,
})

export const store = legacy_createStore(rootReducer);

export type RootActionsType = AppActionsType | ElevatorActionsType;
export type RootStateType = ReturnType<typeof rootReducer>;