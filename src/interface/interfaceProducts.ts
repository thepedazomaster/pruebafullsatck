// Generated by https://quicktype.io

export interface GetProducts {
  message: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  availableQuantity: number;
  reduction: number;
  status: boolean;
  idProductType: number;
  images: Image[];
  svgRate: null | number;
  numberRate: number;
  subTotal: number;
}

export interface Image {
  id: number;
  url: string;
  idProduct: number;
}
