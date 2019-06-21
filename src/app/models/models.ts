export interface IGood {
  id: number;
  groupId: number;
  groupName?: string;
  name: string;
  img: string;
  description: string;
  price: number;
  numbersOfViews: number;
}

export interface IGoodsCategory {
  id: number;
  name: string;
  selected?: boolean;
}
