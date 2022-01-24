import React, { createContext, useContext, useReducer } from "react";
import { ShiftReducer, initialShiftState } from "./shift.reducers";
import { ShiftStateModel } from "../../models/shifts.models";

export interface ShiftContextInterface extends ShiftStateModel {
  dispatch: React.Dispatch<any>;
}

export const StateContext = createContext<ShiftContextInterface>({
  ...initialShiftState,
  dispatch: function () {},
});

export const ShiftStateProvider = (props: { children: any }) => {
  const [shiftValue, shiftDispatch] = useReducer(
    ShiftReducer,
    initialShiftState
  );

  return (
    <StateContext.Provider value={{ ...shiftValue, dispatch: shiftDispatch }}>
      {props.children}
    </StateContext.Provider>
  );
};
export const useShiftStateValue = () => useContext(StateContext);

// {useReducer(reducer, initialState)}>
