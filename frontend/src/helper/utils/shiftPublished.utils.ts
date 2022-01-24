import {
  ShiftPublishModel,
  ShiftPublishResponseModel,
} from "../../models/shifts.models";

export function SerializeShiftPublish(response: ShiftPublishResponseModel) {
  const newData: { [key: string]: ShiftPublishModel } = {};
  const newDate = response.date.slice(0, 10);
  newData[newDate] = {
    published: response.published,
    updatedAt: response.updatedAt,
    createdAt: response.createdAt,
  };
  return newData;
}
