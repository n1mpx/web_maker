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

