import * as shiftPublishRepository from "../database/default/repository/shiftPublishRepository";
import { FindManyOptions, FindOneOptions } from "typeorm";
import ShiftPublish from "../database/default/entity/shiftPublish";
import { ICreateShiftPublish, IUpdateShiftPublish } from "../shared/interfaces";

export const find = async (
  opts: FindManyOptions<ShiftPublish>
): Promise<ShiftPublish[]> => {
  return shiftPublishRepository.find(opts);
};

export const create = async (
  payload: ICreateShiftPublish
): Promise<ShiftPublish> => {
  const shiftPublish = new ShiftPublish();
  shiftPublish.date = payload.date;
  shiftPublish.published = true;

  return shiftPublishRepository.create(shiftPublish);
};

// export const updateById = async (
//   id: string,
//   payload: IUpdateShift
// ): Promise<Shift> => {
//   return shiftRepository.updateById(id, {
//     ...payload,
//   });
// };

// export const deleteById = async (id: string | string[]) => {
//   return shiftRepository.deleteById(id);
// };
