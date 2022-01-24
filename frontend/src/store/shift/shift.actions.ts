import {
  shiftModel,
  ShiftPublishResponseModel,
} from "../../models/shifts.models";

export const GO_TO_NEXT_WEEK = "GO_TO_NEXT_WEEK";
export const GO_TO_PREV_WEEK = "GO_TO_PREV_WEEK";
export const SET_SHIFT_ISODATE = "SET_SHIFT_ISODATE";
export const SET_SHIFT_DATA = "SET_SHIFT_DATA";
// export const ADD_TO_SHIFT_DATA = "SET_SHIFT_DATA";
export const SET_SHIFT_PUBLISH_DATA = "SET_SHIFT_PUBLISH_DATA";
export const UPDATE_SHIFT_PUBLISH_DATA = "UPDATE_SHIFT_PUBLISH_DATA";

export const dispatchGoNextWeek = (dispatch: React.Dispatch<any>) =>
  dispatch({ type: GO_TO_NEXT_WEEK });

export const dispatchGoPrevWeek = (dispatch: React.Dispatch<any>) =>
  dispatch({ type: GO_TO_PREV_WEEK });

export const dispatchSetActiveIsoDate = (
  dispatch: React.Dispatch<any>,
  payload: { iso: string }
) => dispatch({ type: SET_SHIFT_ISODATE, payload });

export const dispatchSetShiftData = (
  dispatch: React.Dispatch<any>,
  payload: { shifts: shiftModel[] }
) => dispatch({ type: SET_SHIFT_DATA, payload });

export const dispatchSetShiftPublishData = (
  dispatch: React.Dispatch<any>,
  payload: { shiftsPublish: ShiftPublishResponseModel[] }
) => dispatch({ type: SET_SHIFT_PUBLISH_DATA, payload });

export const dispatchUpdateShiftPublishData = (
  dispatch: React.Dispatch<any>,
  payload: { shiftPublish: ShiftPublishResponseModel }
) => dispatch({ type: UPDATE_SHIFT_PUBLISH_DATA, payload });
