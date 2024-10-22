import { IAdress } from './address';


export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAdress;
  }

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: IAdress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
  }

export interface IOrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;
  }
