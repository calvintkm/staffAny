import { Server } from "@hapi/hapi";
import createShiftRoutes from "./shifts";
import createShiftPublishRoutes from "./shiftPublish";

export default function (server: Server, basePath: string) {
  console.log("Creating shifts ??", basePath);
  createShiftRoutes(server, basePath + "/shifts");
  createShiftPublishRoutes(server, basePath + "/shiftPublish");
}
