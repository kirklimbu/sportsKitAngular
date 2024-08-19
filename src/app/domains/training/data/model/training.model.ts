import { ITrainingDetail } from './training-detail.model';

export interface ITraining {
  trainingMasterId: number;
  typeId: ITrainingType;
  trainer: string;
  startDate: string;
  endDate: string;
  fromTime: string;
  toTime: string;
  fee: string;
  title: string;
  type: string;
  hasStopReg: boolean;
}

export interface ITrainingType {
  id: number;
  name: string;
}

export interface ITrainingFormDto {
  form: ITrainingDetail;
}
