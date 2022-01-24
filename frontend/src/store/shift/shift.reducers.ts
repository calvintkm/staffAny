import {
  getNextMonday,
  getPrevMonday,
  getMonday,
} from "../../helper/utils/date.utils";
import { SerializeShiftPublish } from "../../helper/utils/shiftPublished.utils";
import {
  ShiftPublishModel,
  ShiftPublishResponseModel,
  ShiftStateModel,
} from "../../models/shifts.models";
import * as ShiftActions from "./shift.actions";

export const initialShiftState: ShiftStateModel = {
  activeDate: getMonday(new Date().toISOString().substring(0, 10)),
  shifts: [],
  shiftsPublish: {},
};

export const ShiftReducer = (
  state: ShiftStateModel,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  if (type === ShiftActions.GO_TO_NEXT_WEEK) {
    const activeDate = getNextMonday(state.activeDate);
    return { ...state, activeDate };
  }
  if (type === ShiftActions.GO_TO_PREV_WEEK) {
    const activeDate = getPrevMonday(state.activeDate);
    return { ...state, activeDate };
  }
  if (type === ShiftActions.SET_SHIFT_ISODATE) {
    const activeDate = getMonday(payload.iso);
    return { ...state, activeDate };
  }

  if (type === ShiftActions.SET_SHIFT_DATA) {
    const shifts = [...payload.shifts];
    return { ...state, shifts };
  }
  if (type === ShiftActions.SET_SHIFT_PUBLISH_DATA) {
    let shiftsPublish: { [key: string]: ShiftPublishModel } = {};
    payload.shiftsPublish.forEach((val: ShiftPublishResponseModel) => {
      const newVal = SerializeShiftPublish(val);

      shiftsPublish = { ...shiftsPublish, ...newVal };
    });
    return { ...state, shiftsPublish };
  }
  if (type === ShiftActions.UPDATE_SHIFT_PUBLISH_DATA) {
    const newVal = SerializeShiftPublish(payload.shiftPublish);

    const shiftsPublish = { ...state.shiftsPublish, ...newVal };

    console.log("UPDATING SHIFT PUBLISH", shiftsPublish, payload, newVal);
    return { ...state, shiftsPublish };
  }

  return state;
};
