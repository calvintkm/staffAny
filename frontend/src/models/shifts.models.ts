export interface ShiftStateModel {
  activeDate: string;
  shifts: shiftModel[];
  shiftsPublish: { [mondayIsoDateOfWeek: string]: ShiftPublishModel };
}

export interface shiftModel {
  createdAt: string;
  date: string;
  endTime: string;
  id: string;
  name: string;
  startTime: string;
  updatedAt: string;
}

export interface ShiftPublishModel {
  published: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface ShiftPublishResponseModel {
  createdAt: string;
  date: string;
  id: string;
  published: boolean;
  updatedAt: string;
}
