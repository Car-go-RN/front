export type RestArea = {
  reviewAVG: number;
  id: number;
  stdRestNm: string;
  restAreaNm: string;
  gasolinePrice: string;
  diselPrice: string;
  lpgPrice: string;
  roadAddress: string;
  phone: string;
  latitude: number;
  longitude: number;
  brands: string[];
  facilities: string[];
  foods: {
    foodNm: string;
    foodCost: string;
  }[];
  isFavorite: boolean;
};

