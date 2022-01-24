import { Request, ResponseToolkit } from "@hapi/hapi";
import * as shiftPublishUsecase from "../../../usecases/shiftPublishUsecase";
import { errorHandler } from "../../../shared/functions/error";
import {
  ICreateShiftPublish,
  ISuccessResponse,
} from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";

const logger = moduleLogger("shiftController");

export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find shift publishes");
  try {
    const filter = req.query;
    const data = await shiftPublishUsecase.find(filter);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get shift publish successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

export const create = async (req: Request, h: ResponseToolkit) => {
  logger.info("Create shift publish");
  try {
    const body = req.payload as ICreateShiftPublish;
    const data = await shiftPublishUsecase.create(body);

    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Create shift publish successful",
      results: data,
    };

    return res;
  } catch (error) {
    logger.error(error.message);
    return errorHandler(h, error);
  }
};

// export const updateById = async (req: Request, h: ResponseToolkit) => {
//   logger.info("Update shift by id");
//   try {
//     const id = req.params.id;
//     const body = req.payload as IUpdateShift;

//     const data = await shiftPublishUsecase.updateById(id, body);
//     const res: ISuccessResponse = {
//       statusCode: 200,
//       message: "Update shift successful",
//       results: data,
//     };
//     return res;
//   } catch (error) {
//     logger.error(error.message)
//     return errorHandler(h, error);
//   }
// };
