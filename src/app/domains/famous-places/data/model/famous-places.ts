export interface IPlaceFormDtoWrapper {
  form: IPlaceFormDto;
  placeCategoryList: IPlaceCategory[];
}
export interface IPlaceFormDto {
  placeId: number;
  categoryId: number;
  name: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  mapLink: string;
  latitude: string;
  longitude: string;
  hasActive: boolean;
  docPath: string;
}
export interface IPlaceCategory {
  categoryId: number;
  category: string;
  hasActive: boolean;
  creDate: string;
}

export interface IPlace1Dto {
  placeId: number;
  categoryId: number;
  name: string;
  categoryName: string;
  description: string;
  mobile: string;
  email: string;
  address: string;
  docPath: string;
  mapLink: string;
  latitude: string;
  longitude: string;
  hasActive: boolean;
}
