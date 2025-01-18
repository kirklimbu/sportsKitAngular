export interface IMember {
    memberId: number;
    snNo: string;
    dob: string;
    name: string;
    memberShipType?: string;
    mobile1: string;
    mobile2: string;
    status?: string;
    profilePic: string;
    address?: string;
    lastPaymentDate?: string;
    bloodGroup: string;
    citizenshipNo: string;
    issueDate: string;
    cardPic: string;
    jobType?: string;
    positionType?: string;

}

export interface IJobType {
    id: number;
    name: string;
    type: string;
}
export interface IPositionType {
    id: number;
    name: string;
    type: string;
}
export interface IMembershipType {
    id: number;
    name: string;
    type: string;
}

export interface IMemberRequirementDto {
    positionTypeList: IPositionType[];
    memberShipTypeList: IMembershipType[];
}