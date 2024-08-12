export interface ITrainingDetail {
    trainingMasterId: number;
    trainingDetailId: number;
    description: string;
    startDate: string;
    subDetailList: ITrainingSubDetail[];
    fromTime: string;
    title: string;


}




export interface ITrainingSubDetail {
    trainingSubDetailId: number;
    trainingDetailId: number;
    trainingMasterId: number;
    link: string;
}
