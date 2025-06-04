export interface IDeliveryMethod {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

export interface IPaymentMethod {
  id: number;
  title: string;
  description?: string;
  image?: string;
}

export interface IRecipient {
  firstName: string;
  lastName: string;
  middleName: string;
  address: string;
  zipCode: string;
  phone: string;
}

interface GoodImage {
  id: number;
  image: string;
  thumbnail?: string;
}

interface Good {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  oldPrice?: number | string;
  colors?: string[];
  title?: string;
  subtitle?: string;
  fullDescription?: string;
  rating?: number;
  reviews?: number;
  reviewsList?: { name: string; text: string; rating: number }[];
  images?: GoodImage[];
}


export interface IBasketItem {
  id: number;
  goodId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  color?: string;
  oldPrice?: number;
}

